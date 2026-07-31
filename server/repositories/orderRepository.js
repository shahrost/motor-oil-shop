const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/orders.json");

function getAllOrders() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function saveOrders(orders) {
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
}

module.exports = {
  getAllOrders,
  saveOrders,
};
