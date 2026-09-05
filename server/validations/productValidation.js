function validateProduct(data) {
  const errors = [];

  if (!data.name) {
    errors.push("نام محصول الزامی است");
  }

  if (!data.brand) {
    errors.push("برند محصول الزامی است");
  }

  if (data.price && isNaN(data.price)) {
    errors.push("قیمت باید عدد باشد");
  }

  if (data.priceCheck && isNaN(data.priceCheck)) {
    errors.push("قیمت اعتباری باید عدد باشد");
  }

  if (data.stock && isNaN(data.stock)) {
    errors.push("موجودی باید عدد باشد");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = validateProduct;
