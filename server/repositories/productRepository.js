const Product = require("../models/Product");
const productListCache = require("../utils/productListCache");

// خروجی آبجکت ساده (toJSON) است تا کش‌شدنی باشد
async function getAllProducts() {
  return productListCache.get(async () =>
    (await Product.find()).map((product) => product.toJSON()),
  );
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

async function setFieldsById(id, fields) {
  return Product.updateOne({ _id: id }, { $set: fields });
}

async function bulkWrite(ops) {
  return Product.bulkWrite(ops);
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
  getAllProducts,
  findDuplicate,
  findBySkus,
  findByBrands,
  setFieldsById,
  bulkWrite,
  findExistingSkus,
  findWhereSkuNotIn,
  deleteWhereSkuNotIn,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
