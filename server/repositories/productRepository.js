const Product = require("../models/Product");

// دریافت همه محصولات
async function getAllProducts() {
  return await Product.find();
}

// ذخیره محصولات
async function saveProducts(products) {
  return await Product.insertMany(products);
}

module.exports = {
  getAllProducts,
  saveProducts,
};
