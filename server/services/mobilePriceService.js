const productRepository = require("../repositories/productRepository");
const AppError = require("../utils/AppError");

const MAX_PRICE = 1_000_000_000_000;

// Validate the entire request before writing anything. Only one price field can change.
function validatePriceChanges(body) {
  const { field, changes } = body || {};
  if (!["price", "priceCheck", "prices"].includes(field)) {
    throw new AppError("نوع قیمت نامعتبر است", 400);
  }
  if (!Array.isArray(changes) || !changes.length || changes.length > 100) {
    throw new AppError("در هر نوبت بین ۱ تا ۱۰۰ قیمت انتخاب کنید", 400);
  }
  const ids = new Set();
  for (const row of changes) {
    if (!row || typeof row.id !== "string" || !/^[a-f\d]{24}$/i.test(row.id)) {
      throw new AppError("شناسه محصول نامعتبر است", 400);
    }
    const id = row.id.toLowerCase();
    if (ids.has(id)) throw new AppError("یک محصول بیش از یک بار انتخاب شده است", 400);
    ids.add(id);
    const amounts = [row.price, row.expectedPrice];
    if (field === "prices") amounts.push(row.priceCheck, row.expectedPriceCheck);
    for (const amount of amounts) {
      if (!Number.isSafeInteger(amount) || amount < 0 || amount > MAX_PRICE) {
        throw new AppError("قیمت باید عدد صحیح نامنفی و به تومان باشد", 400);
      }
    }
  }
  return { field, changes };
}

async function applyPriceChanges(body) {
  const { field, changes } = validatePriceChanges(body);
  const results = { updated: [], unchanged: [], conflicts: [], failed: [] };
  for (const row of changes) {
    try {
      // Compare-and-set: an old browser tab must never overwrite a newer price.
      const product = field === "prices"
        ? await productRepository.updateBothPricesIfCurrent(row)
        : await productRepository.updatePriceIfCurrent(row.id, field, row.expectedPrice, row.price);
      if (product) {
        const unchanged = row.price === row.expectedPrice && (field !== "prices" || row.priceCheck === row.expectedPriceCheck);
        results[unchanged ? "unchanged" : "updated"].push({
          id: row.id, price: row.price,
          ...(field === "prices" ? { priceCheck: row.priceCheck } : {}),
        });
      } else {
        results.conflicts.push({ id: row.id });
      }
    } catch {
      // Preserve a precise partial result. Never retry mutations automatically.
      results.failed.push({ id: row.id });
    }
  }
  return results;
}

module.exports = { applyPriceChanges, validatePriceChanges };
