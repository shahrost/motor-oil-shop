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

// هر قلم: شناسه‌ی محصول، تعداد صحیح ≥ ۱، واحد و روش پرداخت معتبر (قیمت سمت سرور حساب می‌شه)
function validateItem(item, index) {
  const errors = [];
  const row = `ردیف ${index + 1}`;
  const quantity = Number(item?.quantity);

  if (!item?.productId) errors.push(`${row}: محصول مشخص نیست`);

  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push(`${row}: تعداد باید عدد صحیح و حداقل ۱ باشد`);
  }

  if (item?.orderType && !ORDER_TYPES.includes(item.orderType)) {
    errors.push(`${row}: واحد خرید نامعتبر است`);
  }

  if (item?.paymentType && !PAYMENT_TYPES.includes(item.paymentType)) {
    errors.push(`${row}: روش پرداخت نامعتبر است`);
  }

  return errors;
}

function validateOrder(data) {
  const errors = [];

  if (!data.customer?.name) {
    errors.push("نام مشتری الزامی است");
  }

  if (!data.customer?.phone) {
    errors.push("شماره تماس مشتری الزامی است");
  }

  const location = data.customer?.location;

  if (location != null && !isValidLocation(location)) {
    errors.push("موقعیت روی نقشه نامعتبر است");
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    errors.push("سفارش باید حداقل یک کالا داشته باشد");
  } else {
    data.items.forEach((item, index) => errors.push(...validateItem(item, index)));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateOrder;
