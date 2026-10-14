function isValidLocation({ lat, lng } = {}) {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180
  );
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

  if (!data.items || data.items.length === 0) {
    errors.push("سفارش باید حداقل یک کالا داشته باشد");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateOrder;
