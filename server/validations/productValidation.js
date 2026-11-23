function validateProduct(data = {}) {
  const errors = [];

  if (!data.name) {
    errors.push("نام محصول الزامی است");
  }

  if (!data.brand) {
    errors.push("برند محصول الزامی است");
  }

  for (const [field, label] of [["price", "قیمت"], ["priceCheck", "قیمت اعتباری"], ["stock", "موجودی"]]) {
    if (data[field] == null || data[field] === "") continue;
    const value = Number(data[field]);
    if (!Number.isFinite(value) || value < 0) errors.push(`${label} باید عدد نامنفی باشد`);
  }

  if (data.cartonCount != null && data.cartonCount !== "") {
    const count = Number(data.cartonCount);
    if (!Number.isSafeInteger(count) || count < 1) {
      errors.push("تعداد در کارتن باید عدد صحیح مثبت باشد");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateProduct;
