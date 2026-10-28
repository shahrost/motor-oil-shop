import { getMenuCategorySlug } from "../../../utils/classifyMenuCategory";
import { hasProductImage } from "../../../utils/productImage";
import { hasProductPrice } from "../../../utils/productPrice";
import { hasActivePromotion } from "../../../utils/promotionCalc";

// اولویت انتخاب خودکار (عدد کمتر = اول‌تر)؛ بقیه‌ی محصولات انتخاب خودکار نمی‌شن
function priority(product) {
  if (hasActivePromotion(product.promotion)) return 0;
  if (product.isBestSeller) return 1;
  if (getMenuCategorySlug(product) === "gasoline-engine-oil") return 2;
  return null;
}

// هر بار یکی از هر برند تا ردیف همه از یک برند نباشه (ترتیب داخل هر برند حفظ می‌شه)
function roundRobinByBrand(products) {
  const byBrand = new Map();
  products.forEach((product) => {
    if (!byBrand.has(product.brand)) byBrand.set(product.brand, []);
    byBrand.get(product.brand).push(product);
  });

  const queues = [...byBrand.values()];
  const result = [];
  while (queues.some((queue) => queue.length)) {
    queues.forEach((queue) => queue.length && result.push(queue.shift()));
  }

  return result;
}

// محصولات «پیشنهادی» صفحه‌ی اصلی: فهرست دستی data/featuredProducts (id یا SKU) اگه پر باشه،
// وگرنه خودکار count محصول دارای عکس و قیمت به ترتیب priority و از برندهای مختلف
export function pickFeaturedProducts(products, ids, count) {
  if (ids.length > 0) {
    return ids
      .map((key) => products.find((product) => product.id === key || product.sku === key))
      .filter(Boolean);
  }

  const candidates = products.filter(
    (product) =>
      priority(product) !== null &&
      hasProductImage(product) &&
      (hasProductPrice(product, "cash") || hasProductPrice(product, "check")),
  );

  // مرتب بر اساس اولویت، بعد یکی از هر برند: طرح‌های فروش اول ردیف میان ولی کل ردیف رو پر نمی‌کنن
  const sorted = [0, 1, 2].flatMap((level) =>
    candidates.filter((product) => priority(product) === level),
  );

  return roundRobinByBrand(sorted).slice(0, count);
}

export default pickFeaturedProducts;
