const Order = require("../models/Order");

async function getAllOrders() {
  return await Order.find().sort({ createdAt: -1 });
}

async function createOrder(data) {
  return await Order.create(data);
}

async function updateOrderStatus(id, status) {
  return await Order.findOneAndUpdate(
    {
      id,
    },
    {
      status,
    },
    {
      new: true,
    },
  );
}

async function deleteOrder(id) {
  return await Order.findOneAndDelete({
    id,
  });
}

async function deleteAllOrders() {
  return await Order.deleteMany({});
}

module.exports = {
  getAllOrders,

  createOrder,

  updateOrderStatus,

  deleteOrder,

  deleteAllOrders,
};
