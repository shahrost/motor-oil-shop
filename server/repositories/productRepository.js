const Product = require("../models/Product");

async function getAllProducts() {
  return await Product.find();
}

async function createProduct(data) {
  return await Product.create(data);
}

async function getProductById(id) {
  return await Product.findById(id);
}

async function updateProduct(id, data) {
  return await Product.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
}

async function deleteProduct(id) {
  return await Product.findOneAndDelete({
    _id: id,
  });
}

async function deleteAllProducts() {
  return await Product.deleteMany({});
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
