const BrandSale = require("../models/BrandSale");

function findClosedBrands() {
  return BrandSale.find({ closed: true }).select("brand closed -_id").lean();
}

function setBrandClosed(brand, closed) {
  return BrandSale.findOneAndUpdate(
    { brand },
    { $set: { closed } },
    { upsert: true, new: true, runValidators: true },
  );
}

module.exports = { findClosedBrands, setBrandClosed };
