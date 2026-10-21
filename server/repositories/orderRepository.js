const Order = require("../models/Order");

async function getAllOrders() {
  return await Order.find().sort({ createdAt: -1 });
}

async function getOrdersByCustomer(customerId) {
  return await Order.find({ customerId }).sort({ createdAt: -1 });
}

// سفارش‌های یک بازه‌ی زمانی برای گزارش اکسل؛ lean تا حافظه‌ی سرور کم مصرف بشه
async function getOrdersCreatedBetween(from, to) {
  return await Order.find({ createdAt: { $gte: from, $lt: to } })
    .sort({ createdAt: 1 })
    .lean();
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

  getOrdersByCustomer,

  getOrdersCreatedBetween,

  createOrder,

  updateOrderStatus,

  deleteOrder,

  deleteAllOrders,
};
