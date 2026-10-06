const Vehicle = require("../models/Vehicle");

async function getAllVehicles() {
  return Vehicle.find().sort({ sku: 1 });
}

// فیلدهای لازم برای تطبیق نام خودرو و افزودن لینک محصول
async function getVehiclesForLinking() {
  return Vehicle.find()
    .select("sku name nameEn brand brandEn productLinks")
    .lean();
}

async function bulkWrite(ops) {
  return Vehicle.bulkWrite(ops, { ordered: false });
}

// حذف خودروهایی که کدشان در لیست نیست؛ خروجی: خودروهای حذف‌شده { sku, name }
async function deleteWhereSkuNotIn(skus) {
  const stale = await Vehicle.find({ sku: { $nin: skus } }).select("sku name");

  if (stale.length) {
    await Vehicle.deleteMany({ _id: { $in: stale.map((v) => v._id) } });
  }

  return stale.map((v) => ({ sku: v.sku, name: v.name }));
}

module.exports = {
  getAllVehicles,
  getVehiclesForLinking,
  bulkWrite,
  deleteWhereSkuNotIn,
};
