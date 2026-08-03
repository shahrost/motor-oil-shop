const Product = require("../models/Product");

async function getAllProducts() {
  return await Product.find();
}

module.exports = {
  getAllProducts,
};
