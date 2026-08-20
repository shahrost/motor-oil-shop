const Customer = require("../models/Customer");

async function findByPhone(phone) {
  return await Customer.findOne({ phone });
}

async function findById(id) {
  return await Customer.findById(id);
}

async function createCustomer(data) {
  return await Customer.create(data);
}

module.exports = {
  findByPhone,
  findById,
  createCustomer,
};
