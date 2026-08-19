const crypto = require("crypto");

const orderRepository = require("../repositories/orderRepository");

const validateOrder = require("../validations/orderValidation");

const AppError = require("../utils/AppError");

async function getOrders() {
  return await orderRepository.getAllOrders();
}

async function createOrder(data) {
  const validation = validateOrder(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const order = {
    id: crypto.randomUUID(),

    ...data,
  };

  return await orderRepository.createOrder(order);
}

async function updateOrderStatus(id, status) {
  const order = await orderRepository.updateOrderStatus(id, status);

  if (!order) {
    throw new AppError("سفارش یافت نشد", 404);
  }

  return order;
}

async function deleteOrder(id) {
  const order = await orderRepository.deleteOrder(id);

  if (!order) {
    throw new AppError("سفارش یافت نشد", 404);
  }

  return order;
}

async function deleteAllOrders() {
  return await orderRepository.deleteAllOrders();
}

module.exports = {
  getOrders,

  createOrder,

  updateOrderStatus,

  deleteOrder,

  deleteAllOrders,
};
