const Order = require("../models/Order");

// دریافت همه سفارش‌ها
async function getAllOrders() {
  return await Order.find();
}

// ذخیره سفارش‌ها
async function saveOrders(orders) {
  return await Order.insertMany(orders);
}

module.exports = {
  getAllOrders,
  saveOrders,
};
