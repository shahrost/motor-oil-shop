// شکل فشرده‌ی محصول برای لیست GET /api/products (هزار و چند محصول؛ هر بایت روی گوشی حسابه).
// فیلدهایی که سایت استفاده نمی‌کنه حذف می‌شن و مقدارهای پیش‌فرض ("" / 0 / false / [])
// نوشته نمی‌شن؛ کلاینت (ProductContext/helpers/createProduct) پیش‌فرض‌ها رو دوباره پر می‌کنه.
const UNUSED_FIELDS = ["createdAt", "updatedAt", "tags", "supplier", "warranty", "slug", "__v"];

// isActive پیش‌فرضش true است؛ false اون معنی‌داره و باید بمونه
const ALWAYS_KEEP = new Set(["isActive"]);

function isDefault(value) {
  return (
    value === "" ||
    value === 0 ||
    value === false ||
    value === null ||
    (Array.isArray(value) && value.length === 0)
  );
}

function compactObject(object, keep = ALWAYS_KEEP) {
  const result = {};

  Object.entries(object).forEach(([key, value]) => {
    if (!keep.has(key) && isDefault(value)) return;
    result[key] = value;
  });

  return result;
}

function compactProduct(product) {
  const result = compactObject(product);

  UNUSED_FIELDS.forEach((field) => delete result[field]);

  if (result.image) {
    const image = compactObject(result.image, new Set());
    if (Object.keys(image).length) result.image = image;
    else delete result.image;
  }

  // طرح فروش غیرفعال با همه‌ی مقادیر صفر کلاً حذف می‌شه
  if (result.promotion) {
    const promotion = compactObject(result.promotion, new Set());
    if (Object.keys(promotion).length) result.promotion = promotion;
    else delete result.promotion;
  }

  return result;
}

module.exports = compactProduct;
