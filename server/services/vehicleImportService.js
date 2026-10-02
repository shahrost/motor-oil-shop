const Vehicle = require("../models/Vehicle");
const AppError = require("../utils/AppError");
const {
  readWorkbookFile,
  removeFileQuietly,
} = require("../utils/excelReader");

const COLUMN_MAP = {
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

function parseViscosities(raw) {
  return String(raw || "")
    .split(/[,،/\n]+/)
    .map((v) => v.replace(/\s+/g, "").toUpperCase())
    .filter(Boolean);
}

async function importVehicles(excelFile, imageFiles = [], options = {}) {
  try {
    const rows = await readWorkbookFile(excelFile, COLUMN_MAP, [
      "sku",
      "name",
      "brand",
    ]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    const imagesByName = new Map(imageFiles.map((f) => [f.originalname, f]));
    const usedFilenames = new Set();

    const results = { created: 0, updated: 0, failed: [], removed: [] };

    for (const row of rows) {
      try {
        if (!row.sku) throw new Error("کد خودرو خالی است");
        if (!row.name) throw new Error("نام خودرو خالی است");
        if (!row.brand) throw new Error("برند خودرو خالی است");

        const doc = {
          sku: row.sku,
          name: row.name,
          nameEn: row.nameEn || row.name,
          brand: row.brand,
          brandEn: row.brandEn || row.brand,
          years: row.years || "",
          yearsEn: row.yearsEn || row.years || "",
          engine: row.engine || "",
          engineEn: row.engineEn || row.engine || "",
          oilCapacity: row.oilCapacity || "",
          viscosities: parseViscosities(row.viscosities),
          api: row.api || "",
          interval: row.interval || "",
        };

        if (row.image) {
          const imageFile = imagesByName.get(row.image);

          if (!imageFile) {
            throw new Error(
              `فایل عکس «${row.image}» در بین عکس‌های ارسالی پیدا نشد`,
            );
          }

          usedFilenames.add(imageFile.filename);
          doc.image = `/uploads/products/${imageFile.filename}`;
        }

        const key = doc.sku.toUpperCase();
        const existing = await Vehicle.findOne({ sku: key });

        if (existing) {
          await Vehicle.updateOne({ _id: existing._id }, { $set: doc });
          results.updated += 1;
        } else {
          await Vehicle.create(doc);
          results.created += 1;
        }
      } catch (err) {
        results.failed.push({
          row: row.__row,
          sku: row.sku || "-",
          error: err.message,
        });
      }
    }

    if (options.removeMissing) {
      const skusInFile = rows
        .map((row) => String(row.sku || "").trim().toUpperCase())
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
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

async function getVehicles() {
  return Vehicle.find().sort({ brand: 1, name: 1 });
}

module.exports = { COLUMN_MAP, importVehicles, getVehicles };
