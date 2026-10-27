const crypto = require("crypto");

const orderRepository = require("../repositories/orderRepository");

const productRepository = require("../repositories/productRepository");

const { getUnitPrice, getUnitCount, calcPromotionGift } = require("../utils/orderPricing");

const validateOrder = require("../validations/orderValidation");

const AppError = require("../utils/AppError");

async function getOrders() {
  return await orderRepository.getAllOrders();
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

    return {
      ...item,
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

async function createOrder(data) {
  const validation = validateOrder(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const { items, totalPrice } = await priceOrderItems(data.items);

  const order = {
    ...data,

    items,

    totalPrice,

    id: crypto.randomUUID(),
  };

  // موقعیت نقشه اختیاریه؛ null رو ذخیره نمی‌کنیم تا سفارش‌های بدون موقعیت فیلد خالی نداشته باشن
  if (order.customer && order.customer.location == null) {
    const { location, ...customer } = order.customer;
    order.customer = customer;
  }

  return await orderRepository.createOrder(order);
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

  deleteOrder,

  deleteAllOrders,
};
