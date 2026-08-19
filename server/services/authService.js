const bcrypt = require("bcrypt");

const { createToken } = require("../middleware/auth");

const validateLogin = require("../validations/authValidation");

const AppError = require("../utils/AppError");

async function login(data) {
  const validation = validateLogin(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const { username, password } = data;

  const admin = {
    username: process.env.ADMIN_USERNAME,
  };

  if (username !== admin.username) {
    throw new AppError("نام کاربری یا رمز عبور اشتباه است", 401);
  }

  const isValidPassword = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH,
  );

  if (!isValidPassword) {
    throw new AppError("نام کاربری یا رمز عبور اشتباه است", 401);
  }

  const token = createToken(admin);

  return {
    token,
  };
}

module.exports = {
  login,
};
