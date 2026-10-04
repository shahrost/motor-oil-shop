const Vehicle = require("../models/Vehicle");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const { persistImages } = require("../utils/cloudStorage");
const vehicleBrandsEn = require("../data/vehicleBrandsEn");
const {
  loadWorkbook,
  readSheetRows,
  removeFileQuietly,
  toNumber,
} = require("../utils/excelReader");

// فرمت ساده (یک شیت)
const SIMPLE_COLUMN_MAP = {
  "کد خودرو": "sku",
  "نام خودرو": "name",
  "نام انگلیسی خودرو": "nameEn",
  "برند خودرو": "brand",
  "برند انگلیسی": "brandEn",
  "سال ساخت": "years",
  "سال ساخت (انگلیسی)": "yearsEn",
  موتور: "engine",
  "موتور (انگلیسی)": "engineEn",
  "حجم روغن موتور (لیتر)": "oilCapacity",
  "ویسکوزیته‌های پیشنهادی": "viscosities",
  "استاندارد API": "api",
  "فاصله تعویض روغن (کیلومتر)": "interval",
  "نام فایل عکس": "image",
};

// فرمت کامل (چند شیت): «لیست خودروها» + «ارتباط محصولات»
const LIST_SHEET = "لیست خودروها";
const LINKS_SHEET = "ارتباط محصولات";

const LIST_COLUMN_MAP = {
  "کد خودرو": "sku",
  برند: "brand",
  "کشور برند": "country",
  مدل: "model",
  "تیپ / نسخه": "variant",
  "نام کامل خودرو": "fullName",
  موتور: "engine",
  "حجم موتور (لیتر)": "engineSize",
  سوخت: "fuel",
  گیربکس: "gearbox",
  بدنه: "body",
  "گروه خودروسازی / واردکننده": "maker",
  وضعیت: "status",
  "نام فایل عکس": "image",
  "ویسکوزیته پیشنهادی (اصلی)": "viscosity",
  "ویسکوزیته جایگزین": "viscosityAlt",
};

const LINKS_COLUMN_MAP = {
  "کد خودرو": "vehicleSku",
  "کد محصول": "productSku",
  "اولویت نمایش": "priority",
  "نوع توصیه": "kind",
};

function parseViscosities(raw) {
  return String(raw || "")
    .split(/[,،/\n]+/)
    .map((v) => v.replace(/\s+/g, "").toUpperCase())
    .filter(Boolean);
}

function cleanDash(value) {
  const str = String(value || "").trim();

  return str === "—" || str === "-" ? "" : str;
}

function simpleRowToDoc(row) {
  if (!row.name) throw new Error("نام خودرو خالی است");
  if (!row.brand) throw new Error("برند خودرو خالی است");

  return {
    sku: row.sku,
    name: row.name,
    nameEn: row.nameEn || row.name,
    brand: row.brand,
    brandEn: row.brandEn || vehicleBrandsEn[row.brand] || row.brand,
    years: row.years || "",
    yearsEn: row.yearsEn || row.years || "",
    engine: row.engine || "",
    engineEn: row.engineEn || row.engine || "",
    oilCapacity: row.oilCapacity || "",
    viscosities: parseViscosities(row.viscosities),
    api: row.api || "",
    interval: row.interval || "",
  };
}

function listRowToDoc(row) {
  if (!row.brand) throw new Error("برند خودرو خالی است");

  const variant = cleanDash(row.variant);
  const name = [row.model, variant].filter(Boolean).join(" ") || row.fullName;

  if (!name) throw new Error("نام خودرو (مدل) خالی است");

  return {
    sku: row.sku,
    name,
    nameEn: name,
    brand: row.brand,
    brandEn: vehicleBrandsEn[row.brand] || row.brand,
    country: row.country || "",
    engine: cleanDash(row.engine),
    engineEn: cleanDash(row.engine),
    engineSize: cleanDash(row.engineSize),
    fuel: cleanDash(row.fuel),
    gearbox: cleanDash(row.gearbox),
    body: cleanDash(row.body),
    maker: cleanDash(row.maker),
    status: cleanDash(row.status),
    viscosities: parseViscosities(row.viscosity),
    altViscosities: parseViscosities(row.viscosityAlt),
  };
}

// ارتباط خودرو ↔ محصول: { "C10001": [{ sku, priority, kind }, ...] }
function buildLinksMap(linkRows) {
  const map = new Map();

  linkRows.forEach((row) => {
    const vehicleSku = String(row.vehicleSku || "").trim().toUpperCase();
    const productSku = String(row.productSku || "").trim();

    if (!vehicleSku || !productSku) return;

    if (!map.has(vehicleSku)) map.set(vehicleSku, []);

    map.get(vehicleSku).push({
      sku: productSku,
      priority: toNumber(row.priority) || 0,
      kind: String(row.kind || "اصلی").trim(),
    });
  });

  map.forEach((links) => links.sort((a, b) => a.priority - b.priority));

  return map;
}

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
    linksCount: 0,
    missingProducts: [],
  };

  const linkedSkus = new Set();
  const bulkOps = [];

  entries.forEach(({ row, doc, imageName }) => {
    try {
      doc.sku = String(doc.sku || "").trim().toUpperCase();

      if (!doc.sku) throw new Error("کد خودرو خالی است");
      if (!doc.name) throw new Error("نام خودرو خالی است");
      if (!doc.brand) throw new Error("برند خودرو خالی است");

      if (imageName) {
        const imageFile = imagesByName.get(imageName);

        if (!imageFile) {
          throw new Error(
            `فایل عکس «${imageName}» در بین عکس‌های ارسالی پیدا نشد`,
          );
        }

        usedFilenames.add(imageFile.filename);
        doc.image = urlsByFilename.get(imageFile.filename);
      }

      (doc.productLinks || []).forEach((link) => linkedSkus.add(link.sku));
      results.linksCount += (doc.productLinks || []).length;

      bulkOps.push({
        updateOne: {
          filter: { sku: doc.sku },
          update: { $set: doc },
          upsert: true,
        },
      });
    } catch (err) {
      results.failed.push({
        row,
        sku: (doc && doc.sku) || "-",
        error: err.message,
      });
    }
  });

  // یک درخواست گروهی به‌جای صدها رفت‌وبرگشت جدا به دیتابیس (سرعت و جلوگیری از timeout)
  if (bulkOps.length) {
    log("ثبت خودروها در دیتابیس");
    const bulkResult = await Vehicle.bulkWrite(bulkOps, { ordered: false });

    results.created = bulkResult.upsertedCount || 0;
    results.updated = bulkOps.length - results.created;
  }

  if (linkedSkus.size) {
    log("بررسی کد محصول‌های متصل");
    const found = await Product.find({
      sku: { $in: [...linkedSkus].map((s) => s.toUpperCase()) },
    }).select("sku");
    const foundSet = new Set(found.map((p) => p.sku));

    results.missingProducts = [...linkedSkus].filter(
      (s) => !foundSet.has(s.toUpperCase()),
    );
  }

  if (options.removeMissing) {
    const skusInFile = entries
      .map(({ doc }) => String((doc && doc.sku) || "").trim().toUpperCase())
      .filter(Boolean);

    const stale = await Vehicle.find({ sku: { $nin: skusInFile } }).select(
      "sku name",
    );

    if (stale.length) {
      await Vehicle.deleteMany({ _id: { $in: stale.map((v) => v._id) } });

      results.removed = stale.map((v) => ({ sku: v.sku, name: v.name }));
    }
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
  COLUMN_MAP: SIMPLE_COLUMN_MAP,
  importVehicles,
  importParsedVehicles,
};
