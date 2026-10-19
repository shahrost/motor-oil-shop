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

async function addFavorite(id, productId) {
  return await Customer.findByIdAndUpdate(
    id,
    { $addToSet: { favorites: productId } },
    { new: true },
  );
}

async function removeFavorite(id, productId) {
  return await Customer.findByIdAndUpdate(
    id,
    { $pull: { favorites: productId } },
    { new: true },
  );
}

module.exports = {
  addFavorite,
  removeFavorite,
  findByPhone,
  findById,
  createCustomer,
};
