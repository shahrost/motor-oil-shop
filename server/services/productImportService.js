const fs = require("fs/promises");
const ExcelJS = require("exceljs");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const sanitizeXlsx = require("../utils/sanitizeXlsx");
const brands = require("../data/brands");

function normalizeBrand(rawBrand) {
  const value = String(rawBrand || "").trim();

  const match = brands.find(
    (b) =>
      b.name === value || b.nameEn.toLowerCase() === value.toLowerCase(),
  );

  if (!match) {
    throw new Error(
      `برند «${value}» شناخته‌شده نیست. یکی از برندهای موجود را وارد کنید: ${brands
        .map((b) => b.name)
        .join("، ")}`,
    );
  }

  return match.name;
}

const COLUMN_MAP = {
  "کد محصول": "sku",
  "نام محصول": "name",
  برند: "brand",
  دسته‌بندی: "category",
  حجم: "volume",
  ویسکوزیته: "viscosity",
  "استاندارد API": "api",
  "استاندارد ACEA": "acea",
  "نوع روغن": "oilType",
  توضیحات: "description",
  "قیمت (تومان)": "price",
  "تعداد در کارتن": "cartonCount",
  موجودی: "stock",
  "تامین‌کننده": "supplier",
  گارانتی: "warranty",
  "برچسب‌ها": "tags",
  "پرفروش (بله/خیر)": "isBestSeller",
  "نام فایل عکس اصلی": "mainImage",
  "نام فایل‌های گالری": "galleryImages",
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function cellValueToString(value) {
  if (value === null || value === undefined) return "";

  if (value instanceof Date) return value.toISOString();

  if (typeof value === "object") {
    if (Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text).join("");
    }

    if (value.result !== undefined) {
      return cellValueToString(value.result);
    }

    if (typeof value.text === "string") return value.text;

    return "";
  }

  return String(value).trim();
}

function toNumber(rawValue) {
  let str = String(rawValue ?? "").trim();

  if (!str) return NaN;

  str = str
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/[,٬\s]/g, "")
    .replace(/٫/g, ".");

  str = str.replace(/[^\d.-]/g, "");

  return str === "" ? NaN : Number(str);
}

function normalizeHeader(str) {
  return String(str || "")
    .replace(/[‌\s]/g, "")
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی");
}

const NORMALIZED_COLUMN_MAP = Object.fromEntries(
  Object.entries(COLUMN_MAP).map(([label, key]) => [normalizeHeader(label), key]),
);

const COLUMN_LABEL_BY_KEY = Object.fromEntries(
  Object.entries(COLUMN_MAP).map(([label, key]) => [key, label]),
);

async function readWorkbookFile(excelFile, requiredKeys = []) {
  const buffer = await fs.readFile(excelFile.path);
  const cleanBuffer = await sanitizeXlsx(buffer);

  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(cleanBuffer);
  } catch {
    throw new AppError(
      "فایل قابل خواندن نیست. فایل را دوباره از اکسل با گزینه «Save As» ذخیره کنید و دوباره تلاش کنید",
      400,
    );
  }

  const sheet = workbook.worksheets[0];

  if (!sheet) {
    throw new AppError("فایل ورودی خالی است", 400);
  }

  const headers = [];
  const foundKeys = new Set();

  sheet.getRow(1).eachCell((cell, colNumber) => {
    const header = cellValueToString(cell.value);

    headers[colNumber] = header;

    const key = NORMALIZED_COLUMN_MAP[normalizeHeader(header)];

    if (key) foundKeys.add(key);
  });

  const missingKeys = requiredKeys.filter((key) => !foundKeys.has(key));

  if (missingKeys.length) {
    throw new AppError(
      `ستون(های) الزامی در فایل پیدا نشد: ${missingKeys
        .map((key) => `«${COLUMN_LABEL_BY_KEY[key]}»`)
        .join("، ")}. اسم ستون‌ها باید دقیقاً مطابق فایل نمونه باشد`,
      400,
    );
  }

  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const record = { __row: rowNumber };

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const header = headers[colNumber];
      const key = header && NORMALIZED_COLUMN_MAP[normalizeHeader(header)];

      if (!key) return;

      record[key] = cellValueToString(cell.value);
    });

    if (Object.keys(record).length > 1) rows.push(record);
  });

  return rows;
}

async function removeFileQuietly(filePath) {
  try {
    await fs.unlink(filePath);
  } catch {
    // فایل موقت است، اگر پاک نشود مشکلی برای عملکرد ایجاد نمی‌کند
  }
}

function toBoolean(value) {
  return ["بله", "yes", "true", "1"].includes(String(value).trim().toLowerCase());
}

async function importProducts(excelFile, imageFiles = []) {
  try {
    const rows = await readWorkbookFile(excelFile, [
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

    const results = { created: 0, updated: 0, failed: [] };

    for (const row of rows) {
      try {
        if (!row.sku) throw new Error("کد محصول (sku) خالی است");
        if (!row.name) throw new Error("نام محصول خالی است");
        if (!row.brand) throw new Error("برند خالی است");

        const doc = {
          sku: row.sku,
          name: row.name,
          brand: normalizeBrand(row.brand),
          category: row.category || "",
          volume: row.volume || "",
          viscosity: row.viscosity || "",
          api: row.api || "",
          acea: row.acea || "",
          oilType: row.oilType || "",
          description: row.description || "",
          price: toNumber(row.price) || 0,
          cartonCount: toNumber(row.cartonCount) || 1,
          stock: toNumber(row.stock) || 0,
          supplier: row.supplier || "",
          warranty: row.warranty || "",
          tags: row.tags
            ? row.tags.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          isBestSeller: toBoolean(row.isBestSeller),
        };

        if (row.mainImage) {
          const mainFile = imagesByName.get(row.mainImage);

          if (!mainFile) throw new Error(`فایل عکس «${row.mainImage}» در بین عکس‌های ارسالی پیدا نشد`);

          usedFilenames.add(mainFile.filename);

          const gallery = [];

          if (row.galleryImages) {
            const names = row.galleryImages.split(",").map((n) => n.trim()).filter(Boolean);

            for (const name of names) {
              const galleryFile = imagesByName.get(name);
              if (galleryFile) {
                usedFilenames.add(galleryFile.filename);
                gallery.push(`/uploads/products/${galleryFile.filename}`);
              }
            }
          }

          doc.image = {
            main: `/uploads/products/${mainFile.filename}`,
            gallery,
          };
        }

        const existing = await Product.findOne({ sku: doc.sku });

        if (existing) {
          await Product.updateOne({ _id: existing._id }, doc);
          results.updated += 1;
        } else {
          await Product.create(doc);
          results.created += 1;
        }
      } catch (err) {
        results.failed.push({ row: row.__row, sku: row.sku || "-", error: err.message });
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

async function bulkUpdatePrices(excelFile) {
  try {
    const rows = await readWorkbookFile(excelFile, ["sku", "price"]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    const results = { updated: 0, failed: [], notFound: [] };
    const bulkOps = [];

    for (const row of rows) {
      if (!row.sku) {
        results.failed.push({ row: row.__row, error: "کد محصول خالی است" });
        continue;
      }

      const price = toNumber(row.price);

      if (isNaN(price)) {
        results.failed.push({ row: row.__row, sku: row.sku, error: "قیمت نامعتبر است" });
        continue;
      }

      const update = { price };

      const stock = toNumber(row.stock);

      if (!isNaN(stock)) {
        update.stock = stock;
      }

      bulkOps.push({
        updateOne: {
          filter: { sku: row.sku },
          update: { $set: update },
        },
      });
    }

    if (bulkOps.length) {
      const bulkResult = await Product.bulkWrite(bulkOps);

      const skus = bulkOps.map((op) => op.updateOne.filter.sku);
      const found = await Product.find({ sku: { $in: skus } }).select("sku");
      const foundSet = new Set(found.map((p) => p.sku));

      results.updated = bulkResult.matchedCount;
      results.notFound = skus.filter((s) => !foundSet.has(s));
    }

    return results;
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

module.exports = {
  importProducts,
  bulkUpdatePrices,
};
