const bcrypt = require("bcrypt");

const customerRepository = require("../repositories/customerRepository");

const {
  validateRegister,
  validateLogin,
} = require("../validations/customerValidation");

const { createCustomerToken } = require("../middleware/customerAuth");

const AppError = require("../utils/AppError");

async function register(data) {
  const validation = validateRegister(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const existing = await customerRepository.findByPhone(data.phone);

  if (existing) {
    throw new AppError("این شماره موبایل قبلاً ثبت‌نام کرده است", 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const customer = await customerRepository.createCustomer({
    name: data.name,
    phone: data.phone,
    passwordHash,
  });

  const token = createCustomerToken(customer);

  return {
    token,
    customer,
  };
}

async function login(data) {
  const validation = validateLogin(data);

  if (!validation.valid) {
    throw new AppError(validation.errors.join(" - "), 400);
  }

  const customer = await customerRepository.findByPhone(data.phone);

  if (!customer) {
    throw new AppError("شماره موبایل یا رمز عبور اشتباه است", 401);
  }

  const isValidPassword = await bcrypt.compare(
    data.password,
    customer.passwordHash,
  );

  if (!isValidPassword) {
    throw new AppError("شماره موبایل یا رمز عبور اشتباه است", 401);
  }

  const token = createCustomerToken(customer);

  return {
    token,
    customer,
  };
}

async function getProfile(customerId) {
  const customer = await customerRepository.findById(customerId);

  if (!customer) {
    throw new AppError("کاربر یافت نشد", 404);
  }

  return customer;
}

module.exports = {
  register,
  login,
  getProfile,
};
