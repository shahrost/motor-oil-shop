const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");
const { readWorkbookFile, removeFileQuietly } = require("../utils/excelReader");
const { persistImages } = require("../utils/cloudStorage");
const PRODUCT_COLUMN_MAP = require("../utils/productColumns");
const { rowToProductDoc, splitList } = require("../utils/productRowMapper");

// همان محصول با کد (sku) دیگر — دلیل اصلی تکراری‌شدن محصولات هنگام ایمپورت
async function findSameProductWithOtherSku(doc) {
  return productRepository.findDuplicate(
    {
      brand: doc.brand,
      name: doc.name,
      category: doc.category,
      volume: doc.volume,
      viscosity: doc.viscosity,
      api: doc.api,
      description: doc.description,
    },
    { excludeSku: doc.sku },
  );
}

// اسم همه‌ی عکس‌هایی که ردیف‌های اکسل بهشون اشاره کردن (اصلی + گالری)
function collectImageNames(rows) {
  const names = new Set();

  rows.forEach((row) => {
    if (row.mainImage) names.add(row.mainImage);
    splitList(row.galleryImages).forEach((name) => names.add(name));
  });

  return names;
}

// آدرس ابری عکس اصلی و گالری ردیف؛ ردیفی که عکس اصلیش ارسال نشده خطا می‌ده
function resolveRowImage(row, imagesByName, urlsByFilename, usedFilenames) {
  const mainFile = imagesByName.get(row.mainImage);

  if (!mainFile) {
    throw new Error(`فایل عکس «${row.mainImage}» در بین عکس‌های ارسالی پیدا نشد`);
  }

  usedFilenames.add(mainFile.filename);

  const gallery = splitList(row.galleryImages)
    .map((name) => imagesByName.get(name))
    .filter(Boolean)
    .map((file) => {
      usedFilenames.add(file.filename);
      return urlsByFilename.get(file.filename);
    });

  return { main: urlsByFilename.get(mainFile.filename), gallery };
}

// ساخت یا بروزرسانی محصول بر اساس sku؛ خروجی: "created" | "updated"
async function upsertProduct(doc) {
  const existing = await productRepository.findBySku(doc.sku);

  if (existing) {
    await productRepository.setFieldsById(existing._id, doc);
    return "updated";
  }

  const twin = await findSameProductWithOtherSku(doc);

  if (twin) {
    throw new Error(
      `این محصول قبلاً با کد «${twin.sku}» ثبت شده است (مشخصات یکسان). کد را در اکسل به «${twin.sku}» برگردانید تا تکراری ساخته نشود`,
    );
  }

  await productRepository.createProduct(doc);
  return "created";
}

// حذف محصولاتی که توی این فایل اکسل نیستن (گزینه‌ی removeMissing)
async function removeProductsNotIn(rows) {
  const skusInFile = rows
    .map((row) => String(row.sku || "").trim().toUpperCase())
    .filter(Boolean);

  return productRepository.deleteWhereSkuNotIn(skusInFile);
}

async function importProducts(excelFile, imageFiles = [], options = {}) {
  const onStage = options.onStage || (() => {});

  try {
    onStage("خواندن فایل اکسل");

    const rows = await readWorkbookFile(excelFile, PRODUCT_COLUMN_MAP, [
      "sku",
      "name",
      "brand",
      "price",
    ]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    const imagesByName = new Map(imageFiles.map((f) => [f.originalname, f]));
    const usedFilenames = new Set();
    const results = { created: 0, updated: 0, failed: [], removed: [] };

    // عکس‌های مورد نیاز ردیف‌ها یک‌جا (هم‌زمان) به فضای ابری منتقل می‌شن
    onStage("انتقال عکس‌ها به فضای ابری");

    const urlsByFilename = await persistImages(
      [...collectImageNames(rows)].map((n) => imagesByName.get(n)).filter(Boolean),
    );

    onStage("ثبت محصولات در دیتابیس");

    for (const row of rows) {
      try {
        const doc = rowToProductDoc(row);

        if (row.mainImage) {
          doc.image = resolveRowImage(row, imagesByName, urlsByFilename, usedFilenames);
        }

        results[await upsertProduct(doc)] += 1;
      } catch (err) {
        results.failed.push({ row: row.__row, sku: row.sku || "-", error: err.message });
      }
    }

    if (options.removeMissing) {
      results.removed = await removeProductsNotIn(rows);
    }

    await Promise.all(
      imageFiles
        .filter((f) => !usedFilenames.has(f.filename))
        .map((f) => removeFileQuietly(f.path)),
    );

    return results;
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

module.exports = { importProducts };
