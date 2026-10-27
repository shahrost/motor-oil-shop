import { getPromotionRuleLines, hasActivePromotion } from "../../../utils/promotionCalc";

// طرح‌های فعال برای بنر صفحه‌ی اصلی، گروه‌بندی‌شده تا کارت تکراری نشون داده نشه:
// محصولاتی که note یکسان دارن (مثل «جشنواره فروش ضد یخ لوکینی») یک گروه‌ان؛
// محصول بدون note با محصولات هم‌برند و هم‌شرایط خودش گروه می‌شه.
// lines: فقط خط‌های شرایطی که برای همه‌ی محصولات گروه درسته (مثلاً «حداقل سفارش» یک محصول نمیاد)
export function groupPromotions(products, t) {
  const groups = new Map();

  products.forEach((product) => {
    if (!hasActivePromotion(product.promotion)) return;

    const lines = getPromotionRuleLines(product.promotion, t);
    const note = product.promotion.note?.trim() || "";
    const key = note ? `note:${note}` : `rule:${product.brand}|${lines.join("|")}`;

    const group = groups.get(key);

    if (!group) {
      groups.set(key, { key, note, brand: product.brand, products: [product], lines });
      return;
    }

    group.products.push(product);
    group.lines = group.lines.filter((line) => lines.includes(line));
  });

  return [...groups.values()];
}

export default groupPromotions;
