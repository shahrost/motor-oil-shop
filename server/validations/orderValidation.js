function isValidLocation({ lat, lng } = {}) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180
  );
}

const ORDER_TYPES = ["number", "carton"];
const PAYMENT_TYPES = ["cash", "check"];

const MOBILE_PATTERN = /^09\d{9}$/;
const MAX_ITEMS = 100;
const MAX_QUANTITY = 10000;

// سقف طول فیلدهای متنی مشتری (جلوی ذخیره‌ی متن‌های بی‌اندازه در دیتابیس)
const CUSTOMER_LIMITS = {
  name: { max: 100, label: "نام" },
  phone: { max: 11, label: "شماره موبایل" },
  area: { max: 100, label: "منطقه" },
  address: { max: 1000, label: "آدرس" },
};

const isOptionalString = (value) => value == null || typeof value === "string";

// هر قلم: شناسه‌ی محصول، تعداد صحیح ۱ تا سقف، واحد و روش پرداخت معتبر (قیمت سمت سرور حساب می‌شه)
function validateItem(item, index) {
  const errors = [];
  const row = `ردیف ${index + 1}`;
  const quantity = Number(item?.quantity);

  if (!item?.productId || typeof item.productId !== "string") {
    errors.push(`${row}: محصول مشخص نیست`);
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    errors.push(`${row}: تعداد باید عدد صحیح بین ۱ تا ${MAX_QUANTITY} باشد`);
  }

  if (item?.orderType && !ORDER_TYPES.includes(item.orderType)) {
    errors.push(`${row}: واحد خرید نامعتبر است`);
  }

  if (item?.paymentType && !PAYMENT_TYPES.includes(item.paymentType)) {
    errors.push(`${row}: روش پرداخت نامعتبر است`);
  }

  if (!isOptionalString(item?.vehicle) || (item?.vehicle || "").length > 200) {
    errors.push(`${row}: نام خودرو نامعتبر است`);
  }

  return errors;
}

function validateCustomer(customer) {
  const errors = [];

  if (!customer || typeof customer !== "object") return ["مشخصات مشتری الزامی است"];

  Object.entries(CUSTOMER_LIMITS).forEach(([field, { max, label }]) => {
    const value = customer[field];

    if (!isOptionalString(value)) errors.push(`${label} نامعتبر است`);
    else if ((value || "").length > max) errors.push(`${label} بیش از حد طولانی است`);
  });

  // نوع فیلدها نامعتبره؛ بقیه‌ی بررسی‌ها روی رشته انجام می‌شن
  if (errors.length) return errors;

  if (!(customer.name || "").trim()) errors.push("نام مشتری الزامی است");

  if (!customer.phone) errors.push("شماره تماس مشتری الزامی است");
  else if (!MOBILE_PATTERN.test(customer.phone)) errors.push("شماره موبایل معتبر نیست");

  if (customer.location != null && !isValidLocation(customer.location)) {
    errors.push("موقعیت روی نقشه نامعتبر است");
  }

  return errors;
}

function validateOrder(data) {
  const errors = validateCustomer(data?.customer);

  if (!Array.isArray(data?.items) || data.items.length === 0) {
    errors.push("سفارش باید حداقل یک کالا داشته باشد");
  } else if (data.items.length > MAX_ITEMS) {
    errors.push(`حداکثر ${MAX_ITEMS} ردیف در یک سفارش مجاز است`);
  } else {
    data.items.forEach((item, index) => errors.push(...validateItem(item, index)));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateOrder;
