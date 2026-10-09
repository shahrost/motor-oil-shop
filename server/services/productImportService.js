const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");
const RowError = require("../utils/RowError");
const { readWorkbookFile, removeFileQuietly } = require("../utils/excelReader");
const { persistImages } = require("../utils/cloudStorage");
const { buildImageNameIndex } = require("../utils/imageNameIndex");
const PRODUCT_COLUMN_MAP = require("../utils/productColumns");
const { rowToProductDoc, splitList } = require("../utils/productRowMapper");
const { linkProductsToVehicles } = require("./vehicleLinkService");

// فیلدهایی که یکسان بودنشان یعنی «همان محصول» (مثل بررسی تکراری در productService)
const TWIN_FIELDS = ["brand", "name", "category", "volume", "viscosity", "api", "description"];

// ایمپورت صدها ردیف دارد و دیتابیس خارج از سرور است (هر کوئری تا ~۱ ثانیه)؛ پس به‌جای
// دو کوئری برای هر ردیف، محصولات موجود یک‌جا خوانده و مقایسه‌ها در حافظه انجام می‌شود.
const skuKeyOf = (sku) => String(sku || "").trim().toUpperCase();

const twinKeyOf = (product) =>
  JSON.stringify(TWIN_FIELDS.map((field) => String(product[field] ?? "").trim()));

async function loadExistingProducts(docs) {
  const [bySku, sameBrand] = await Promise.all([
    productRepository.findBySkus(docs.map((doc) => skuKeyOf(doc.sku))),
    productRepository.findByBrands([...new Set(docs.map((doc) => doc.brand))], TWIN_FIELDS),
  ]);

  const twinsByKey = new Map();

  sameBrand.forEach((product) => {
    const key = twinKeyOf(product);

    if (!twinsByKey.has(key)) twinsByKey.set(key, []);
    twinsByKey.get(key).push(product);
  });

  return {
    bySku: new Map(bySku.map((product) => [skuKeyOf(product.sku), product])),
    // همان محصول با کد (sku) دیگر — دلیل اصلی تکراری‌شدن محصولات هنگام ایمپورت
    findTwin: (doc) =>
      (twinsByKey.get(twinKeyOf(doc)) || []).find(
        (product) => skuKeyOf(product.sku) !== skuKeyOf(doc.sku),
      ),
  };
}

// عکس‌های ردیف. عکس اختیاری است: فایل پیدانشده (اصلی یا گالری) ردیف را رد نمی‌کند، فقط
// گزارش می‌شود (main = null یعنی محصول بدون عکس ساخته می‌شود یا عکس فعلی‌اش می‌ماند).
// خطای مبهم‌بودن (چند فایل هم‌نام) ردیف را رد می‌کند.
function findImageOrNull(imageIndex, name, onMissing) {
  try {
    return imageIndex.find(name);
  } catch (err) {
    if (err.code !== "IMAGE_MISSING") throw err;

    onMissing(name);

    return null;
  }
}

function resolveRowImages(row, imageIndex, onMissing) {
  const main = findImageOrNull(imageIndex, row.mainImage, onMissing);
  const gallery = splitList(row.galleryImages)
    .map((name) => findImageOrNull(imageIndex, name, onMissing))
    .filter(Boolean);

  return { main, gallery };
}

// وضعیت ردیف نسبت به دیتابیس: "created" | "updated" | "skipped".
// با onlyNew محصول موجود دست نمی‌خورد (skipped). محصول تکراری با کد دیگر خطا می‌دهد.
function decideAction(doc, onlyNew, existingProducts) {
  const existing = existingProducts.bySku.get(skuKeyOf(doc.sku));

  if (existing && onlyNew) return { outcome: "skipped" };

  if (existing) return { outcome: "updated", existingId: existing._id };

  const twin = existingProducts.findTwin(doc);

  if (twin) {
    throw new RowError(
      `این محصول قبلاً با کد «${twin.sku}» ثبت شده است (مشخصات یکسان). کد را در اکسل به «${twin.sku}» برگردانید تا تکراری ساخته نشود`,
      "محصول با مشخصات یکسان قبلاً با کد دیگری ثبت شده است",
    );
  }

  return { outcome: "created" };
}

async function writeProduct(entry) {
  if (entry.outcome === "updated") {
    await productRepository.setFieldsById(entry.existingId, entry.doc);
  } else {
    await productRepository.createProduct(entry.doc);
  }
}

// خطاهای هم‌نوع (مثلاً «برند ناشناخته» برای ۱۰۰ ردیف) یک‌جا گروه می‌شن
function groupFailures(failed) {
  const groups = new Map();

  failed.forEach((f) => {
    const group = groups.get(f.groupKey) || {
      error: f.groupKey,
      hint: f.hint,
      count: 0,
      rows: [],
    };

    group.count += 1;
    group.rows.push({
      row: f.row,
      sku: f.sku,
      detail: f.groupKey === f.error ? "" : f.error,
    });
    groups.set(f.groupKey, group);
  });

  return [...groups.values()].sort((a, b) => b.count - a.count);
}

function failureOf(row, err) {
  return {
    row: row.__row,
    sku: row.sku || "-",
    error: err.message,
    groupKey: err.groupKey || err.message,
    hint: err.hint || "",
  };
}

function summaryOf(entry) {
  return { row: entry.row.__row, sku: entry.doc.sku, name: entry.doc.name };
}

// مرحله‌ی اعتبارسنجی (بدون هیچ نوشتنی): هر ردیف ← { row, doc, outcome, images } یا خطا
async function planRows(rows, imageIndex, options) {
  const plan = { entries: [], failed: [], duplicates: [], missingImages: [] };
  const seenSkus = new Set();
  const mapped = [];

  rows.forEach((row) => {
    try {
      const doc = rowToProductDoc(row);
      const skuKey = skuKeyOf(doc.sku);

      if (seenSkus.has(skuKey)) {
        plan.duplicates.push({ row: row.__row, sku: doc.sku, name: doc.name });
        return;
      }

      seenSkus.add(skuKey);
      mapped.push({ row, doc });
    } catch (err) {
      plan.failed.push(failureOf(row, err));
    }
  });

  if (!mapped.length) return plan;

  const existingProducts = await loadExistingProducts(mapped.map((m) => m.doc));

  mapped.forEach(({ row, doc }) => {
    try {
      const images = row.mainImage
        ? resolveRowImages(row, imageIndex, (fileName) =>
            plan.missingImages.push({ row: row.__row, sku: doc.sku, name: fileName }),
          )
        : null;
      const action = decideAction(doc, options.onlyNew, existingProducts);

      plan.entries.push({ row, doc, images, ...action });
    } catch (err) {
      plan.failed.push(failureOf(row, err));
    }
  });

  return plan;
}

const countOutcome = (entries, outcome) =>
  entries.filter((e) => e.outcome === outcome).length;

// کد محصولات داخل فایل اکسل (برای گزینه‌ی removeMissing)
function skusOf(rows) {
  return rows
    .map((row) => String(row.sku || "").trim().toUpperCase())
    .filter(Boolean);
}

async function previewRemoval(rows) {
  const stale = await productRepository.findWhereSkuNotIn(skusOf(rows));

  return stale.map((p) => ({ sku: p.sku, name: p.name }));
}

const WRITE_CONCURRENCY = 8;

// نوشتن ردیف‌های معتبر؛ فقط ردیف‌هایی که نوشته می‌شن عکسشون به فضای ابری منتقل می‌شه
async function applyPlan(plan, results, imageFiles, onStage) {
  const writable = plan.entries.filter((e) => e.outcome !== "skipped");
  const imageFilesNeeded = new Map();

  writable.forEach(({ images }) => {
    if (!images) return;

    [images.main, ...images.gallery].filter(Boolean).forEach((f) =>
      imageFilesNeeded.set(f.filename, f),
    );
  });

  onStage("انتقال عکس‌ها به فضای ابری");

  const urlsByFilename = await persistImages([...imageFilesNeeded.values()]);

  onStage(`ثبت ${writable.length} محصول در دیتابیس`);

  // نوشتن‌ها چندتا هم‌زمان (هر کدام یک رفت‌وبرگشت به دیتابیس بیرونی است)
  let next = 0;

  const worker = async () => {
    while (next < writable.length) {
      const entry = writable[next];

      next += 1;

      try {
        if (entry.images && entry.images.main) {
          entry.doc.image = {
            main: urlsByFilename.get(entry.images.main.filename),
            gallery: entry.images.gallery.map((f) => urlsByFilename.get(f.filename)),
          };
        }

        await writeProduct(entry);
        results[entry.outcome] += 1;
      } catch (err) {
        results.failed.push(failureOf(entry.row, err));
      }
    }
  };

  await Promise.all(Array.from({ length: WRITE_CONCURRENCY }, worker));

  const failedRows = new Set(results.failed.map((f) => f.row));
  const linkEntries = [];

  plan.entries.forEach((entry) => {
    const { row, doc } = entry;

    if (failedRows.has(row.__row)) return;

    // ستون «خودروهای سازگار» فقط وقتی توی فایل باشه بررسی می‌شه
    if (row.compatibleVehicles === undefined) return;

    if (row.compatibleVehicles) {
      linkEntries.push({ row: row.__row, sku: doc.sku, vehicles: row.compatibleVehicles });
    } else {
      results.noVehicles.push(summaryOf(entry));
    }
  });

  if (linkEntries.length) {
    onStage("اتصال به خودروهای سازگار");

    const links = await linkProductsToVehicles(linkEntries);

    results.vehicleLinks = links.linked;
    results.unmatchedVehicles = links.unmatched;
  }

  // عکس‌های آپلودشده‌ای که هیچ ردیفی ازشان استفاده نکرد
  await Promise.all(
    imageFiles
      .filter((f) => f.path && !imageFilesNeeded.has(f.filename))
      .map((f) => removeFileQuietly(f.path)),
  );
}

// اعتبارسنجی کامل ← (dryRun: فقط گزارش) ← نوشتن ← حذف.
// ایمنی حذف: اگه حتی یک ردیف خطا داشته باشه هیچ‌چیز نوشته یا حذف نمی‌شه (aborted)،
// و حذف فقط وقتی انجام می‌شه که همه‌ی نوشتن‌ها موفق بوده باشن.
async function importProducts(excelFile, imageFiles = [], options = {}) {
  const onStage = options.onStage || (() => {});

  try {
    onStage("خواندن فایل اکسل");

    // قیمت الزامی نیست (مثلاً لیست فیلترها)؛ ستون غایب قیمت فعلی رو تغییر نمی‌ده
    const rows = await readWorkbookFile(excelFile, PRODUCT_COLUMN_MAP, [
      "sku",
      "name",
      "brand",
    ]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    onStage("اعتبارسنجی ردیف‌ها");

    const plan = await planRows(rows, buildImageNameIndex(imageFiles), options);
    const results = {
      dryRun: Boolean(options.dryRun),
      aborted: "",
      removalSkipped: "",
      totalRows: rows.length,
      created: 0,
      updated: 0,
      failed: plan.failed,
      failureGroups: [],
      removed: [],
      skipped: plan.entries.filter((e) => e.outcome === "skipped").map(summaryOf),
      duplicates: plan.duplicates,
      missingImages: plan.missingImages,
      vehicleLinks: [],
      unmatchedVehicles: [],
      noVehicles: [],
    };

    const finish = () => {
      results.failureGroups = groupFailures(results.failed);

      return results;
    };

    if (options.removeMissing && plan.failed.length) {
      results.aborted = `به‌دلیل ${plan.failed.length} ردیف دارای خطا، هیچ محصولی ثبت یا حذف نشد (گزینه‌ی «حذف محصولاتی که در اکسل نیستند» فعال بود). خطاها را اصلاح کنید و دوباره اجرا کنید`;

      return finish();
    }

    if (options.dryRun) {
      results.created = countOutcome(plan.entries, "created");
      results.updated = countOutcome(plan.entries, "updated");

      if (options.removeMissing) results.removed = await previewRemoval(rows);

      return finish();
    }

    await applyPlan(plan, results, imageFiles, onStage);

    if (options.removeMissing) {
      if (results.failed.length) {
        results.removalSkipped = "به‌دلیل ردیف‌های ناموفق، هیچ محصولی حذف نشد";
      } else {
        onStage("حذف محصولات غایب در اکسل");
        results.removed = await productRepository.deleteWhereSkuNotIn(skusOf(rows));
      }
    }

    return finish();
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

module.exports = { importProducts };
