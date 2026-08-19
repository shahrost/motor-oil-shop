function validateOrder(data) {
  const errors = [];

  if (!data.customer?.name) {
    errors.push("نام مشتری الزامی است");
  }

  if (!data.customer?.phone) {
    errors.push("شماره تماس مشتری الزامی است");
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
