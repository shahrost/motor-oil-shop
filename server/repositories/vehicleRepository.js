const Vehicle = require("../models/Vehicle");
const vehicleListCache = require("../utils/vehicleListCache");

// خروجی آبجکت ساده (toJSON) است تا کش‌شدنی باشد
async function getAllVehicles() {
  return vehicleListCache.get(async () =>
    (await Vehicle.find().sort({ sku: 1 })).map((vehicle) => vehicle.toJSON()),
  );
}

// برندها با تعداد مدل‌ها (بدون خواندن همه‌ی خودروها): [{ name, nameEn, count }]
async function getBrandSummaries() {
  const rows = await Vehicle.aggregate([
    {
      $group: {
        _id: "$brand",
        nameEn: { $max: "$brandEn" },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1, _id: 1 } },
  ]);

  return rows.map((row) => ({
    name: row._id,
    nameEn: row.nameEn || row._id,
    count: row.count,
  }));
}

// فیلدهای لازم برای تطبیق نام خودرو و افزودن لینک محصول
async function getVehiclesForLinking() {
  return Vehicle.find()
    .select("sku name nameEn brand brandEn productLinks")
    .lean();
}

// خودروهایی که حداقل یک لینک «فیلتر» دارند (فقط فیلدهای لازم برای نمایش)
async function getVehiclesWithFilterLinks(filterKind) {
  return Vehicle.find({ "productLinks.kind": filterKind })
    .sort({ sku: 1 })
    .select("name nameEn productLinks")
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
  getBrandSummaries,
  getVehiclesForLinking,
  getVehiclesWithFilterLinks,
  bulkWrite,
  deleteWhereSkuNotIn,
};
