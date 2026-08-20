const customerAuthService = require("../services/customerAuthService");
const orderService = require("../services/orderService");

const apiResponse = require("../utils/apiResponse");

async function register(req, res, next) {
  try {
    const result = await customerAuthService.register(req.body);

    return apiResponse.created(res, result, "ثبت‌نام موفق");
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await customerAuthService.login(req.body);

    return apiResponse.success(res, result, "ورود موفق");
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const customer = await customerAuthService.getProfile(req.customerId);

    return apiResponse.success(res, customer);
  } catch (error) {
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await orderService.getOrdersByCustomer(req.customerId);

    return apiResponse.success(res, orders);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getMe,
  getMyOrders,
};
