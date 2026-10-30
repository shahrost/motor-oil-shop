const crypto = require("crypto");

const orderRepository = require("../repositories/orderRepository");

const productRepository = require("../repositories/productRepository");

const { getUnitPrice, getUnitCount, calcPromotionGift } = require("../utils/orderPricing");

const validateOrder = require("../validations/orderValidation");

const AppError = require("../utils/AppError");

const { notifyNewOrder } = require("./orderNotificationService");

const SPEC_FIELDS = ["sku", "category", "api", "acea", "oilType"];

// سفارش‌های قدیمی مشخصات فنی (API، ACEA، نوع روغن، کد کالا) رو ذخیره نکرده بودن؛
// برای اونها مشخصات فعلی محصول از دیتابیس پر می‌شه (فقط فیلدهای خالی)
async function fillMissingItemSpecs(orders) {
  const missingIds = orders.flatMap((order) =>
    (order.items || [])
      .filter((item) => item.productId && SPEC_FIELDS.every((field) => !item[field]))
      .map((item) => item.productId),
  );

  if (!missingIds.length) return orders;

  const products = await productRepository.findSpecsByIds(missingIds);
  const byId = new Map(products.map((product) => [product._id.toString(), product]));

  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const product = byId.get(String(item.productId));
      if (!product) return;

      SPEC_FIELDS.forEach((field) => {
        if (!item[field]) item[field] = product[field] || "";
      });
    });
  });

  return orders;
}

async function getOrders() {
  return await fillMissingItemSpecs(await orderRepository.getAllOrders());
}

// قیمت، تعداد کل و هدیه‌ی هر قلم و جمع سفارش از روی محصول دیتابیس (نه عددی که مرورگر فرستاده)؛
// محصول ناموجود یا بدون قیمت برای روش پرداخت انتخاب‌شده ← خطای ۴۰۰ و سفارش ثبت نمی‌شه
async function priceOrderItems(items) {
  const products = await productRepository.findPricingByIds(items.map((item) => item.productId));
  const byId = new Map(products.map((product) => [product._id.toString(), product]));
  const errors = [];

  const priced = items.map((item, index) => {
    const product = byId.get(String(item.productId));
    const orderType = item.orderType || "number";
    const paymentType = item.paymentType || "cash";
    const quantity = Number(item.quantity);

    if (!product) {
      errors.push(`ردیف ${index + 1} (${item.productName || "-"}): محصول پیدا نشد`);
      return item;
    }

    const price = getUnitPrice(product, paymentType);

    if (!(price > 0)) {
      errors.push(`ردیف ${index + 1} (${product.name}): قیمت ندارد؛ برای قیمت تماس بگیرید`);
    }

    // فقط فیلدهای مشخص ذخیره می‌شن؛ نام و مشخصات از دیتابیس، نه از بدنه‌ی درخواست
    return {
      productId: String(item.productId),
      productName: product.name || "",
      brand: product.brand || "",
      viscosity: product.viscosity || "",
      volume: product.volume == null ? "" : String(product.volume),
      sku: product.sku || "",
      category: product.category || "",
      api: product.api || "",
      acea: product.acea || "",
      oilType: product.oilType || "",
      vehicle: (item.vehicle || "").trim(),
      orderType,
      paymentType,
      quantity,
      price,
      totalCount: getUnitCount(product, orderType, quantity),
      giftQty: calcPromotionGift(product.promotion, orderType, quantity, paymentType),
    };
  });

  if (errors.length) {
    throw new AppError(errors.join(" - "), 400);
  }

  return {
    items: priced,
    totalPrice: priced.reduce((sum, item) => sum + item.price * item.totalCount, 0),
  };
}

// مشخصات مشتری فقط با فیلدهای مجاز. موقعیت نقشه اختیاریه؛ null ذخیره نمی‌شه
// تا سفارش‌های بدون موقعیت فیلد خالی نداشته باشن
function pickCustomer({ name, phone, area, address, location }) {
  return {
    name: name.trim(),
    phone,
    area: (area || "").trim(),
    address: (address || "").trim(),
    ...(location != null && { location: { lat: location.lat, lng: location.lng } }),
  };
}

// customerId فقط از توکن مشتری (optionalCustomerAuth)؛ وضعیت و تاریخ هم سمت سرور تعیین می‌شن،
// پس هیچ فیلدی از بدنه‌ی درخواست بدون بررسی ذخیره نمی‌شه
async function createOrder(data, customerId) {
  const validation = validateOrder(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const { items, totalPrice } = await priceOrderItems(data.items);

  const order = await orderRepository.createOrder({
    id: crypto.randomUUID(),
    customerId: customerId || "",
    customer: pickCustomer(data.customer),
    items,
    totalPrice,
    status: "جدید",
    date: new Date().toLocaleDateString("fa-IR", { timeZone: "Asia/Tehran" }),
  });

  // پیامک «سفارش جدید» برای صاحب فروشگاه (پس‌زمینه؛ منتظرش نمی‌مونیم)
  notifyNewOrder(order);

  return order;
}

async function getOrdersByCustomer(customerId) {
  return await orderRepository.getOrdersByCustomer(customerId);
}

async function updateOrderStatus(id, status) {
  const order = await orderRepository.updateOrderStatus(id, status);

  if (!order) {
    throw new AppError("سفارش یافت نشد", 404);
  }

  return order;
}

// فقط true/false پذیرفته می‌شه تا مقدار دلخواه از بدنه‌ی درخواست ذخیره نشه
async function setOrderDone(id, done) {
  if (typeof done !== "boolean") {
    throw new AppError("مقدار تیک سفارش نامعتبر است", 400);
  }

  const order = await orderRepository.setOrderDone(id, done);

  if (!order) {
    throw new AppError("سفارش یافت نشد", 404);
  }

  return order;
}

// تیک «ناموجود» یک قلم؛ شماره‌ی ردیف باید عدد صحیح باشه تا مسیر دلخواه در $set ساخته نشه
async function setItemUnavailable(id, index, unavailable) {
  const itemIndex = Number(index);

  if (!Number.isInteger(itemIndex) || itemIndex < 0 || itemIndex > 99) {
    throw new AppError("ردیف سفارش نامعتبر است", 400);
  }

  if (typeof unavailable !== "boolean") {
    throw new AppError("مقدار ناموجود نامعتبر است", 400);
  }

  const order = await orderRepository.setItemUnavailable(id, itemIndex, unavailable);

  if (!order) {
    throw new AppError("سفارش یا ردیف یافت نشد", 404);
  }

  return order;
}

async function deleteOrder(id) {
  const order = await orderRepository.deleteOrder(id);

  if (!order) {
    throw new AppError("سفارش یافت نشد", 404);
  }

  return order;
}

async function deleteAllOrders() {
  return await orderRepository.deleteAllOrders();
}

module.exports = {
  getOrders,

  createOrder,

  getOrdersByCustomer,

  updateOrderStatus,

  setOrderDone,

  setItemUnavailable,

  deleteOrder,

  deleteAllOrders,
};
