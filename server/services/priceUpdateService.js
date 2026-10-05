const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");
const { readWorkbookFile, removeFileQuietly, toNumber } = require("../utils/excelReader");
const PRODUCT_COLUMN_MAP = require("../utils/productColumns");

// یک ردیف اکسل ← عملیات بروزرسانی قیمت (و در صورت وجود، قیمت اعتباری و موجودی)
function rowToUpdate(row) {
  if (!row.sku) throw new Error("کد محصول خالی است");

  const price = toNumber(row.price);

  if (isNaN(price)) throw new Error("قیمت نامعتبر است");

  const update = { price };

  const priceCheck = toNumber(row.priceCheck);
  if (!isNaN(priceCheck)) update.priceCheck = priceCheck;

  const stock = toNumber(row.stock);
  if (!isNaN(stock)) update.stock = stock;

  return { updateOne: { filter: { sku: row.sku }, update: { $set: update } } };
}

// بروزرسانی گروهی قیمت‌ها از فایل اکسل (فقط کد محصول + قیمت لازمه)
async function bulkUpdatePrices(excelFile) {
  try {
    const rows = await readWorkbookFile(excelFile, PRODUCT_COLUMN_MAP, ["sku", "price"]);

    if (!rows.length) {
      throw new AppError("هیچ ردیف قابل خواندنی در فایل پیدا نشد", 400);
    }

    const results = { updated: 0, failed: [], notFound: [] };
    const bulkOps = [];

    for (const row of rows) {
      try {
        bulkOps.push(rowToUpdate(row));
      } catch (err) {
        results.failed.push({ row: row.__row, sku: row.sku || undefined, error: err.message });
      }
    }

    if (bulkOps.length) {
      const bulkResult = await productRepository.bulkWrite(bulkOps);

      const skus = bulkOps.map((op) => op.updateOne.filter.sku);
      const foundSet = new Set(await productRepository.findExistingSkus(skus));

      results.updated = bulkResult.matchedCount;
      results.notFound = skus.filter((s) => !foundSet.has(s));
    }

    return results;
  } finally {
    await removeFileQuietly(excelFile.path);
  }
}

module.exports = { bulkUpdatePrices };
