const mongoose = require("mongoose");
const Vehicle = require("../models/Vehicle");
const leanToJSON = require("../utils/leanToJSON");
const filterCompatibilityCache = require("../utils/filterCompatibilityCache");
const vehicleSearchCache = require("../utils/vehicleSearchCache");

// لیست کامل خودروها (با ده‌ها هزار لینک محصول) دیگه در حافظه‌ی سرور نگه داشته نمی‌شه:
// با ۱۱۹۱ خودرو / ۲۳ هزار لینک حافظه‌ی سرور به سقف Runflare می‌رسید (PROJECT_STATE بخش ۳۱).
// هر صفحه فقط داده‌ی خودش رو مستقیم از دیتابیس می‌گیره (lean + فیلدهای لازم).

const toJSON = (doc) => leanToJSON(Vehicle, doc);

// همه‌ی خودروها بدون لینک محصولات (فقط برای GET /api/vehicles؛ کلاینت دیگه صداش نمی‌زنه)
async function getLightList() {
  return (await Vehicle.find().select("-productLinks").sort({ sku: 1 }).lean()).map(toJSON);
}

// مدل‌های یک برند برای صفحه‌ی /vehicles/:brand (کارت‌ها لینک محصول لازم ندارن)
async function findByBrand(brand) {
  return (
    await Vehicle.find({ brand }).select("-productLinks").sort({ sku: 1 }).lean()
  ).map(toJSON);
}

// یک خودرو با همه‌ی جزئیات (صفحه‌ی /vehicle/:id)؛ نبود یا شناسه‌ی نامعتبر ← null
async function findById(id) {
  if (!mongoose.isValidObjectId(id)) return null;

  const vehicle = await Vehicle.findById(id).lean();

  return vehicle ? toJSON(vehicle) : null;
}

// نام چند خودرو: Map(id ← name)
async function findNamesByIds(ids) {
  const valid = [...new Set(ids)].filter((id) => mongoose.isValidObjectId(id));
  const rows = await Vehicle.find({ _id: { $in: valid } }).select("name").lean();

  return new Map(rows.map((row) => [row._id.toString(), row.name]));
}

// همه‌ی خودروها فقط با فیلدهای کارت (برای جستجوی صفحه‌ی «خودروهای من»؛ فقط بافر gzip جواب کش می‌شه).
// بدون applyDefaults: فیلد خالی در خروجی نمیاد و کلاینت پیش‌فرض می‌ذاره
async function getSearchList() {
  const rows = await Vehicle.find()
    .select("name nameEn brand brandEn image viscosities oilCapacity")
    .sort({ sku: 1 })
    .lean();

  return rows.map(({ _id, ...vehicle }) => ({ id: _id.toString(), ...vehicle }));
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

// خودروهای سازگار هر محصول از یک نوع لینک، کامل داخل دیتابیس جمع می‌شه (بدون
// آوردن همه‌ی لینک‌ها به حافظه): [{ _id: "<کد محصول>", vehicles: [{ name, nameEn }] }]
async function getCompatibilityByProduct(kind) {
  return Vehicle.aggregate([
    { $match: { "productLinks.kind": kind } },
    { $project: { sku: 1, name: 1, nameEn: 1, productLinks: 1 } },
    { $unwind: "$productLinks" },
    { $match: { "productLinks.kind": kind } },
    {
      $group: {
        _id: { product: { $toUpper: "$productLinks.sku" }, vehicle: "$_id" },
        sku: { $first: "$sku" },
        name: { $first: "$name" },
        nameEn: { $first: "$nameEn" },
      },
    },
    { $sort: { sku: 1 } },
    {
      $group: {
        _id: "$_id.product",
        vehicles: { $push: { name: "$name", nameEn: { $ifNull: ["$nameEn", ""] } } },
      },
    },
  ]).allowDiskUse(true);
}

async function bulkWrite(ops) {
  return Vehicle.bulkWrite(ops, { ordered: false });
}

// ایمپورت: ساخت/بروزرسانی خودروها بر اساس sku مستقیم با درایور MongoDB (بدون
// تبدیل Mongoose). تبدیل ۱۲۰۰ خودرو با ۲۳ هزار لینک به سند Mongoose حدود ۲۵MB
// حافظه می‌گرفت (سقف Runflare). docs قبلاً در ایمپورت اعتبارسنجی و هم‌شکل اسکیما شدن؛
// فیلدهای پیش‌فرض موقع خواندن (leanToJSON) اعمال می‌شن. خروجی: تعداد ساخته‌شده
async function upsertManyBySku(docs) {
  const now = new Date();
  const result = await Vehicle.collection.bulkWrite(
    docs.map((doc) => ({
      updateOne: {
        filter: { sku: doc.sku },
        update: { $set: { ...doc, updatedAt: now }, $setOnInsert: { createdAt: now } },
        upsert: true,
      },
    })),
    { ordered: false },
  );

  // نوشتن با درایور، پلاگین onAnyWrite مدل رو صدا نمی‌زنه
  filterCompatibilityCache.invalidate();
  vehicleSearchCache.invalidate();

  return result.upsertedCount || 0;
}

// حذف خودروهایی که کدشان در لیست نیست؛ خروجی: خودروهای حذف‌شده { sku, name }
async function deleteWhereSkuNotIn(skus) {
  const stale = await Vehicle.find({ sku: { $nin: skus } }).select("sku name").lean();

  if (stale.length) {
    await Vehicle.deleteMany({ _id: { $in: stale.map((v) => v._id) } });
  }

  return stale.map((v) => ({ sku: v.sku, name: v.name }));
}

module.exports = {
  getLightList,
  findByBrand,
  findById,
  findNamesByIds,
  getSearchList,
  getBrandSummaries,
  getVehiclesForLinking,
  getCompatibilityByProduct,
  bulkWrite,
  upsertManyBySku,
  deleteWhereSkuNotIn,
};
