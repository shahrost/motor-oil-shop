const { getAllOrders, saveOrders } = require("../repositories/orderRepository");

// دریافت همه سفارش‌ها
function getOrders(req, res) {
  const orders = getAllOrders();

  res.json(orders);
}

// ثبت سفارش جدید
function createOrder(req, res) {
  console.log("ORDER BODY:", req.body);
  const orders = getAllOrders();

  const newOrder = {
    id: Date.now(),

    ...req.body,
  };

  orders.push(newOrder);

  saveOrders(orders);

  res.status(201).json(newOrder);
}

// تغییر وضعیت سفارش
function updateOrderStatus(req, res) {
  const orders = getAllOrders();

  const id = Number(req.params.id);

  const updatedOrders = orders.map((order) => {
    if (order.id === id) {
      return {
        ...order,

        status: req.body.status,
      };
    }

    return order;
  });

  saveOrders(updatedOrders);

  const updatedOrder = updatedOrders.find((order) => order.id === id);

  res.json(updatedOrder);
}

// حذف یک سفارش
function deleteOrder(req, res) {
  const orders = getAllOrders();

  const id = Number(req.params.id);

  const filteredOrders = orders.filter((order) => order.id !== id);

  saveOrders(filteredOrders);

  res.json({
    message: "Order deleted",
  });
}

// حذف همه سفارش‌ها
function deleteAllOrders(req, res) {
  saveOrders([]);

  res.json({
    message: "All orders deleted",
  });
}

module.exports = {
  getOrders,

  createOrder,

  updateOrderStatus,

  deleteOrder,

  deleteAllOrders,
};
