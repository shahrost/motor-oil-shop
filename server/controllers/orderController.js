const orderService = require("../services/orderService");

const apiResponse = require("../utils/apiResponse");

async function getOrders(req, res, next) {
  try {
    const orders = await orderService.getOrders();

    return apiResponse.success(res, orders);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(req.body);

    return apiResponse.created(res, order);
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );

    return apiResponse.success(res, order);
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    await orderService.deleteOrder(req.params.id);

    return apiResponse.success(res, null, "سفارش حذف شد");
  } catch (error) {
    next(error);
  }
}

async function deleteAllOrders(req, res, next) {
  try {
    await orderService.deleteAllOrders();

    return apiResponse.success(res, null, "تمام سفارش‌ها حذف شدند");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrders,

  createOrder,

  updateOrderStatus,

  deleteOrder,

  deleteAllOrders,
};
