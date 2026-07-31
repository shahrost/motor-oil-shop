const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");

function getAllProducts() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function saveProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

module.exports = {
  getAllProducts,
  saveProducts,
};
