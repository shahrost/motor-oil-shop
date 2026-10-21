const orderRepository = require("../repositories/orderRepository");

const AppError = require("../utils/AppError");

const { addTableSheet } = require("../utils/orderExcel");

const {
  toPersianDigits,
  formatJalaliDateTime,
  jalaliMonthLabel,
  isInJalaliMonth,
  approxGregorianRange,
} = require("../utils/jalaliDate");

const PAYMENT_LABELS = { cash: "نقدی", check: "اعتباری (چکی)" };

const ORDER_COLUMNS = [
  { header: "شماره سفارش", key: "orderNumber", width: 14 },
  { header: "تاریخ و ساعت", key: "date", width: 20 },
  { header: "نام مشتری", key: "customerName", width: 22 },
  { header: "شماره تماس", key: "phone", width: 15 },
  { header: "خودرو", key: "vehicle", width: 22 },
  { header: "برند", key: "brand", width: 14 },
  { header: "نام محصول", key: "productName", width: 42 },
  { header: "تعداد", key: "count", width: 9, number: true },
  { header: "قیمت واحد (تومان)", key: "unitPrice", width: 18, number: true },
  { header: "جمع ردیف (تومان)", key: "lineTotal", width: 18, number: true },
  { header: "نوع پرداخت", key: "payment", width: 15 },
  { header: "وضعیت سفارش", key: "status", width: 15 },
];

const CUSTOMER_COLUMNS = [
  { header: "نام مشتری", key: "customerName", width: 24 },
  { header: "شماره تماس", key: "phone", width: 15 },
  { header: "تعداد سفارش‌ها", key: "orderCount", width: 15, number: true },
  { header: "تعداد کالا", key: "itemCount", width: 12, number: true },
  { header: "جمع کل مبلغ (تومان)", key: "total", width: 22, number: true },
];

const PRODUCT_COLUMNS = [
  { header: "نام محصول", key: "productName", width: 42 },
  { header: "برند", key: "brand", width: 14 },
  { header: "جمع تعداد فروش", key: "count", width: 16, number: true },
  { header: "جمع مبلغ (تومان)", key: "total", width: 22, number: true },
];

// شماره‌ای که مشتری هم در «خریدهای من» می‌بینه (۸ کاراکتر اول شناسه)
const orderNumber = (order) => `#${String(order.id).slice(0, 8)}`;

// شماره‌ی تماس فارسی/انگلیسی یکسان حساب بشه
const normalizePhone = (phone) =>
  String(phone || "")
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/\D/g, "");

const itemCount = (item) => Number(item.totalCount) || Number(item.quantity) || 0;

function parseMonth(yearRaw, monthRaw) {
  const year = Number(yearRaw);
  const month = Number(monthRaw);

  if (!Number.isInteger(year) || year < 1390 || year > 1500) {
    throw new AppError("سال شمسی نامعتبر است", 400);
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new AppError("ماه شمسی نامعتبر است", 400);
  }

  return { year, month };
}

async function getMonthOrders(year, month) {
  const { from, to } = approxGregorianRange(year, month);
  const orders = await orderRepository.getOrdersCreatedBetween(from, to);

  return orders.filter((order) => isInJalaliMonth(order.createdAt, year, month));
}

function buildOrderRows(orders) {
  return orders.flatMap((order) =>
    (order.items || []).map((item) => {
      const count = itemCount(item);
      const unitPrice = Number(item.price) || 0;

      return {
        orderNumber: orderNumber(order),
        date: formatJalaliDateTime(order.createdAt),
        customerName: order.customer?.name || "",
        phone: order.customer?.phone || "",
        vehicle: item.vehicle || "—",
        brand: item.brand || "",
        productName: item.productName || "",
        count,
        unitPrice,
        lineTotal: count * unitPrice,
        payment: PAYMENT_LABELS[item.paymentType] || PAYMENT_LABELS.cash,
        status: order.status || "",
      };
    }),
  );
}

// جمع‌ها از روی ردیف کالاها (تعداد × قیمت واحد) تا با جمع کل شیت «سفارش‌ها» یکی باشن
const lineTotal = (item) => itemCount(item) * (Number(item.price) || 0);

function buildCustomerRows(orders) {
  const customers = new Map();

  orders.forEach((order) => {
    const key = normalizePhone(order.customer?.phone) || order.customer?.name || order.id;
    const customer = customers.get(key) || {
      customerName: order.customer?.name || "",
      phone: order.customer?.phone || "",
      orderCount: 0,
      itemCount: 0,
      total: 0,
    };

    customer.orderCount += 1;

    (order.items || []).forEach((item) => {
      customer.itemCount += itemCount(item);
      customer.total += lineTotal(item);
    });

    customers.set(key, customer);
  });

  return [...customers.values()].sort((a, b) => b.total - a.total);
}

function buildProductRows(orders) {
  const products = new Map();

  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const key = item.productId || `${item.brand}|${item.productName}`;
      const product = products.get(key) || {
        productName: item.productName || "",
        brand: item.brand || "",
        count: 0,
        total: 0,
      };

      product.count += itemCount(item);
      product.total += lineTotal(item);
      products.set(key, product);
    });
  });

  return [...products.values()].sort((a, b) => b.total - a.total);
}

// اکسل سفارش‌های یک ماه شمسی: «سفارش‌ها» (هر ردیف یک کالا)، «خلاصه مشتریان»، «خلاصه محصولات»
async function buildMonthlyWorkbook(yearRaw, monthRaw) {
  const { year, month } = parseMonth(yearRaw, monthRaw);

  const orders = await getMonthOrders(year, month);

  if (orders.length === 0) {
    throw new AppError(`در ${jalaliMonthLabel(year, month)} سفارشی ثبت نشده است`, 404);
  }

  // کتابخانه‌ی سنگین فقط موقع ساخت فایل لود می‌شه (سقف حافظه‌ی سرور)
  const ExcelJS = require("exceljs");

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "شهرام روغن";
  workbook.created = new Date();

  addTableSheet(workbook, {
    name: "سفارش‌ها",
    columns: ORDER_COLUMNS,
    rows: buildOrderRows(orders),
    totalKeys: ["count", "lineTotal"],
  });

  addTableSheet(workbook, {
    name: "خلاصه مشتریان",
    columns: CUSTOMER_COLUMNS,
    rows: buildCustomerRows(orders),
    totalKeys: ["orderCount", "itemCount", "total"],
  });

  addTableSheet(workbook, {
    name: "خلاصه محصولات",
    columns: PRODUCT_COLUMNS,
    rows: buildProductRows(orders),
    totalKeys: ["count", "total"],
  });

  const fileName = `سفارشات-${toPersianDigits(year)}-${toPersianDigits(String(month).padStart(2, "0"))}.xlsx`;

  return { workbook, fileName, asciiFileName: `orders-${year}-${String(month).padStart(2, "0")}.xlsx` };
}

module.exports = {
  buildMonthlyWorkbook,
};
