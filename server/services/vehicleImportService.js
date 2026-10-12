const vehicleRepository = require("../repositories/vehicleRepository");
const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");
const { persistImages } = require("../utils/cloudStorage");
const {
  loadWorkbook,
  readSheetRows,
  removeFileQuietly,
} = require("../utils/excelReader");
const {
  SIMPLE_COLUMN_MAP,
  LIST_SHEET,
  LINKS_SHEET,
  LIST_COLUMN_MAP,
  LINKS_COLUMN_MAP,
} = require("../utils/vehicleColumns");
const {
  simpleRowToDoc,
  listRowToDoc,
  buildLinksMap,
} = require("../utils/vehicleRowMapper");

// تعداد خودرو در هر درخواست گروهی به دیتابیس؛ یک‌جا نوشتن ۱۲۰۰ خودرو با ۲۳ هزار
// لینک حافظه‌ی سرور رو از سقف Runflare رد می‌کرد (PROJECT_STATE بخش ۳۱)
const BULK_CHUNK = 100;

// ذخیره‌ی خودروهای آماده (بعد از پردازش اکسل): entries = [{ row, doc, imageName }]
async function persistVehicles(entries, failed, imageFiles, options, log) {
  const imagesByName = new Map(imageFiles.map((f) => [f.originalname, f]));
  const usedFilenames = new Set();

  log("انتقال عکس‌ها به فضای ابری");
  const urlsByFilename = await persistImages(
    [...new Set(entries.map(({ imageName }) => imageName).filter(Boolean))]
      .map((name) => imagesByName.get(name))
      .filter(Boolean),
  );

  const results = {
    created: 0,
    updated: 0,
    failed: [...failed],
    removed: [],
    missingImages: [],
    linksCount: 0,
    missingProducts: [],
  };

  const linkedSkus = new Set();
  const validDocs = [];

  entries.forEach(({ row, doc, imageName }) => {
    try {
      doc.sku = String(doc.sku || "").trim().toUpperCase();

      if (!doc.sku) throw new Error("کد خودرو خالی است");
      if (!doc.name) throw new Error("نام خودرو خالی است");
      if (!doc.brand) throw new Error("برند خودرو خالی است");

      // عکسِ پیدانشده ردیف رو رد نمی‌کنه (مثل ایمپورت محصولات): خودرو بدون عکس
      // ثبت می‌شه (عکس قبلی‌اش دست نمی‌خوره) و در گزارش missingImages میاد
      if (imageName) {
        const imageFile = imagesByName.get(imageName);

        if (imageFile) {
          usedFilenames.add(imageFile.filename);
          doc.image = urlsByFilename.get(imageFile.filename);
        } else {
          results.missingImages.push({ row, sku: doc.sku, image: imageName });
        }
      }

      (doc.productLinks || []).forEach((link) => linkedSkus.add(link.sku));
      results.linksCount += (doc.productLinks || []).length;

      validDocs.push(doc);
    } catch (err) {
      results.failed.push({
        row,
        sku: (doc && doc.sku) || "-",
        error: err.message,
      });
    }
  });

  // یک درخواست گروهی به‌جای صدها رفت‌وبرگشت جدا به دیتابیس (سرعت و جلوگیری از timeout)
  if (validDocs.length) {
    log("ثبت خودروها در دیتابیس");

    for (let i = 0; i < validDocs.length; i += BULK_CHUNK) {
      results.created += await vehicleRepository.upsertManyBySku(
        validDocs.slice(i, i + BULK_CHUNK),
      );
    }

    results.updated = validDocs.length - results.created;
  }

  if (linkedSkus.size) {
    log("بررسی کد محصول‌های متصل");
    const foundSet = new Set(
      await productRepository.findExistingSkus(
        [...linkedSkus].map((s) => s.toUpperCase()),
      ),
    );

    results.missingProducts = [...linkedSkus].filter(
      (s) => !foundSet.has(s.toUpperCase()),
    );
  }

  if (options.removeMissing) {
    const skusInFile = entries
      .map(({ doc }) => String((doc && doc.sku) || "").trim().toUpperCase())
      .filter(Boolean);

    const removed = await vehicleRepository.deleteWhereSkuNotIn(skusInFile);

    if (removed.length) results.removed = removed;
  }

  await Promise.all(
    imageFiles
      .filter((f) => !usedFilenames.has(f.filename))
      .map((f) => removeFileQuietly(f.path)),
  );

  return results;
}

// ایمپورت از فایل اکسل روی سرور (فایل‌های کوچک / فرمت ساده)
async function importVehicles(excelFile, imageFiles = [], options = {}) {
  const log = options.onStage || (() => {});

  try {
    log("خواندن فایل اکسل");
    const workbook = await loadWorkbook(excelFile);
    const isFullFormat = Boolean(workbook.getWorksheet(LIST_SHEET));

    log("پردازش ردیف‌ها");
    const rows = isFullFormat
      ? readSheetRows(workbook, LIST_COLUMN_MAP, ["sku", "brand"], LIST_SHEET)
      : readSheetRows(workbook, SIMPLE_COLUMN_MAP, ["sku", "name", "brand"]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    const linksMap =
      isFullFormat && workbook.getWorksheet(LINKS_SHEET)
        ? buildLinksMap(
            readSheetRows(
              workbook,
              LINKS_COLUMN_MAP,
              ["vehicleSku", "productSku"],
              LINKS_SHEET,
            ),
          )
        : null;

    const entries = [];
    const failed = [];

    rows.forEach((row) => {
      try {
        if (!row.sku) throw new Error("کد خودرو خالی است");

        const doc = isFullFormat ? listRowToDoc(row) : simpleRowToDoc(row);

        doc.sku = row.sku.toUpperCase();

        if (linksMap) doc.productLinks = linksMap.get(doc.sku) || [];

        entries.push({ row: row.__row, doc, imageName: row.image });
      } catch (err) {
        failed.push({ row: row.__row, sku: row.sku || "-", error: err.message });
      }
    });

    return await persistVehicles(entries, failed, imageFiles, options, log);
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

// ایمپورت از داده‌ی آماده: مرورگر اکسل رو پردازش می‌کنه و فقط JSON می‌فرسته
// (پردازش اکسل روی سرور CPU زیادی می‌گیره). vehicles = [{ row, image, ...doc }]
async function importParsedVehicles(vehicles, imageFiles = [], options = {}) {
  const log = options.onStage || (() => {});

  if (!Array.isArray(vehicles) || !vehicles.length) {
    throw new AppError("لیست خودروها خالی است", 400);
  }

  log("آماده‌سازی داده‌ها");

  const entries = vehicles.map(({ row, image, ...doc }) => ({
    row,
    doc,
    imageName: image,
  }));

  return persistVehicles(entries, [], imageFiles, options, log);
}

module.exports = {
  importVehicles,
  importParsedVehicles,
};
