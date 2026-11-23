const mongoose = require("mongoose");

const Product = require("../models/Product");
const leanToJSON = require("../utils/leanToJSON");

// خواندن یکی‌یکی محصولات، بدون ساختن لیست کامل در حافظه‌ی محدود سرور.
async function* iterateProducts() {
  for await (const product of Product.find().lean().cursor()) {
    yield leanToJSON(Product, product);
  }
}

function hasBrand(brand) {
  return Product.exists({ brand });
}

async function createProduct(data) {
  return await Product.create(data);
}

async function getProductById(id) {
  return await Product.findById(id);
}

async function updateProduct(id, data) {
  return await Product.findOneAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteProduct(id) {
  return await Product.findOneAndDelete({
    _id: id,
  });
}

async function deleteAllProducts() {
  return await Product.deleteMany({});
}

// محصولی با همین مشخصات (برای جلوگیری از ثبت تکراری)؛ excludeSku یعنی با کد دیگری
async function findDuplicate(fields, { excludeSku } = {}) {
  const filter = excludeSku ? { ...fields, sku: { $ne: excludeSku } } : fields;

  return Product.findOne(filter).select("sku");
}

// محصولات با این کدها (برای ایمپورت گروهی، یک کوئری به‌جای یک کوئری برای هر ردیف)
async function findBySkus(skus) {
  return Product.find({ sku: { $in: skus } }).select("sku").lean();
}

// محصولات این برندها با فیلدهای داده‌شده (برای تشخیص محصول تکراری با کد دیگر در ایمپورت)
async function findByBrands(brands, fields) {
  return Product.find({ brand: { $in: brands } }).select(["sku", ...fields]).lean();
}

// فیلدهای لازم برای قیمت‌گذاری سفارش (شناسه‌ی نامعتبر نادیده گرفته می‌شه)
async function findPricingByIds(ids) {
  const validIds = [...new Set(ids)].filter((id) => mongoose.isValidObjectId(id));

  return Product.find({ _id: { $in: validIds } })
    .select("name sku brand category viscosity volume api acea oilType price priceCheck cartonCount promotion isActive")
    .lean();
}

// مشخصات فنی محصولات (برای تکمیل اقلام سفارش‌های قدیمی که این مشخصات رو ذخیره نکرده بودن)
async function findSpecsByIds(ids) {
  const validIds = [...new Set(ids)].filter((id) => mongoose.isValidObjectId(id));

  return Product.find({ _id: { $in: validIds } })
    .select("sku category api acea oilType")
    .lean();
}

// فقط شناسه و تاریخ آخرین تغییر محصولات فعال (نقشه‌ی سایت)
async function getSitemapEntries() {
  return Product.find({ isActive: { $ne: false } }).select("_id updatedAt").lean();
}

async function setFieldsById(id, fields) {
  return Product.updateOne({ _id: id }, { $set: fields }, { runValidators: true });
}

async function bulkWrite(ops) {
  return Product.bulkWrite(ops);
}

async function updatePriceIfCurrent(id, field, expectedPrice, price) {
  const filter = { _id: id, [field]: expectedPrice };
  if (expectedPrice === 0) {
    delete filter[field];
    filter.$or = [{ [field]: 0 }, { [field]: { $exists: false } }];
  }
  return Product.findOneAndUpdate(filter, { $set: { [field]: price } }, { new: true })
    .select("_id")
    .lean();
}

async function updateBothPricesIfCurrent(row) {
  const expected = (field, value) => value === 0
    ? { $or: [{ [field]: 0 }, { [field]: { $exists: false } }] } : { [field]: value };
  return Product.findOneAndUpdate({ _id: row.id, $and: [
    expected("price", row.expectedPrice), expected("priceCheck", row.expectedPriceCheck),
  ] }, { $set: { price: row.price, priceCheck: row.priceCheck } }, { new: true }).select("_id").lean();
}

// از بین کدهای داده‌شده، آن‌هایی که در دیتابیس محصول دارند
async function findExistingSkus(skus) {
  const found = await Product.find({ sku: { $in: skus } }).select("sku");

  return found.map((p) => p.sku);
}

// محصولاتی که کدشان در لیست نیست (بدون حذف)؛ خروجی: [{ _id, sku, name }]
async function findWhereSkuNotIn(skus) {
  return Product.find({
    sku: { $exists: true, $nin: ["", ...skus] },
  }).select("sku name");
}

// حذف محصولاتی که کدشان در لیست نیست؛ خروجی: محصولات حذف‌شده { sku, name }
async function deleteWhereSkuNotIn(skus) {
  const stale = await findWhereSkuNotIn(skus);

  if (stale.length) {
    await Product.deleteMany({ _id: { $in: stale.map((p) => p._id) } });
  }

  return stale.map((p) => ({ sku: p.sku, name: p.name }));
}

module.exports = {
  iterateProducts,
  hasBrand,
  findDuplicate,
  findBySkus,
  findByBrands,
  findPricingByIds,
  findSpecsByIds,
  getSitemapEntries,
  setFieldsById,
  bulkWrite,
  updatePriceIfCurrent,
  updateBothPricesIfCurrent,
  findExistingSkus,
  findWhereSkuNotIn,
  deleteWhereSkuNotIn,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
