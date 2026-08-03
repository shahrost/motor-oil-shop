const { getAllOrders } = require("../repositories/orderRepository");

const Order = require("../models/Order");

// دریافت همه سفارش‌ها
async function getOrders(req, res) {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ثبت سفارش جدید
async function createOrder(req, res) {
  try {
    console.log("MONGO ORDER CONTROLLER ACTIVE");

    const newOrder = await Order.create({
      ...req.body,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// تغییر وضعیت سفارش
async function updateOrderStatus(req, res) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true,
      },
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// حذف یک سفارش
async function deleteOrder(req, res) {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// حذف همه سفارش‌ها
async function deleteAllOrders(req, res) {
  try {
    await Order.deleteMany({});

    res.json({
      message: "All orders deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
};
