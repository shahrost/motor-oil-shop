const Product = require("../models/Product");
const AppError = require("../utils/AppError");
const {
  readWorkbookFile,
  removeFileQuietly,
  toNumber,
} = require("../utils/excelReader");
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
  "قیمت نقدی (تومان)": "price",
  "قیمت اعتباری (تومان)": "priceCheck",
  "تعداد در کارتن": "cartonCount",
  موجودی: "stock",
  "تامین‌کننده": "supplier",
  گارانتی: "warranty",
  "برچسب‌ها": "tags",
  "پرفروش (بله/خیر)": "isBestSeller",
  "نام فایل عکس اصلی": "mainImage",
  "نام فایل‌های گالری": "galleryImages",
};

// همان محصول با کد (sku) دیگر — دلیل اصلی تکراری‌شدن محصولات هنگام ایمپورت
async function findSameProductWithOtherSku(doc) {
  return Product.findOne({
    sku: { $ne: doc.sku },
    brand: doc.brand,
    name: doc.name,
    category: doc.category,
    volume: doc.volume,
    viscosity: doc.viscosity,
    api: doc.api,
    description: doc.description,
  }).select("sku");
}

function toBoolean(value) {
  return ["بله", "yes", "true", "1"].includes(String(value).trim().toLowerCase());
}

async function importProducts(excelFile, imageFiles = [], options = {}) {
  try {
    const rows = await readWorkbookFile(excelFile, COLUMN_MAP, [
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

        const priceCheck = toNumber(row.priceCheck);

        if (!isNaN(priceCheck)) {
          doc.priceCheck = priceCheck;
        }

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

        if (!existing) {
          const twin = await findSameProductWithOtherSku(doc);

          if (twin) {
            throw new Error(
              `این محصول قبلاً با کد «${twin.sku}» ثبت شده است (مشخصات یکسان). کد را در اکسل به «${twin.sku}» برگردانید تا تکراری ساخته نشود`,
            );
          }
        }

        if (existing) {
          await Product.updateOne({ _id: existing._id }, { $set: doc });
          results.updated += 1;
        } else {
          await Product.create(doc);
          results.created += 1;
        }
      } catch (err) {
        results.failed.push({ row: row.__row, sku: row.sku || "-", error: err.message });
      }
    }

    if (options.removeMissing) {
      const skusInFile = rows
        .map((row) => String(row.sku || "").trim().toUpperCase())
        .filter(Boolean);

      const stale = await Product.find({
        sku: { $exists: true, $nin: ["", ...skusInFile] },
      }).select("sku name");

      if (stale.length) {
        await Product.deleteMany({ _id: { $in: stale.map((p) => p._id) } });

        results.removed = stale.map((p) => ({ sku: p.sku, name: p.name }));
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
    const rows = await readWorkbookFile(excelFile, COLUMN_MAP, ["sku", "price"]);

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

      const priceCheck = toNumber(row.priceCheck);

      if (!isNaN(priceCheck)) {
        update.priceCheck = priceCheck;
      }

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
