const Order = require("../models/Order");

async function getAllOrders() {
  return await Order.find().sort({
    createdAt: -1,
  });
}

module.exports = {
  getAllOrders,
};
