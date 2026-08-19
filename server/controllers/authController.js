const authService = require("../services/authService");

const apiResponse = require("../utils/apiResponse");

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    return apiResponse.success(res, result, "ورود موفق");
  } catch (error) {
    next(error);
  }
}

async function verify(req, res) {
  return apiResponse.success(res, { admin: req.admin }, "توکن معتبر است");
}

module.exports = {
  login,
  verify,
};
