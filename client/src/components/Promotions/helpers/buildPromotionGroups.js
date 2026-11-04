import { hasActivePromotion } from "../../../utils/promotionCalc";

// گروه‌های ثابت + یک گروه برای هر برند طرح‌دار بی‌گروه؛ گروه بدون طرح (نه محصول، نه عکس) حذف می‌شه.
// گروه بدون برند (سبدها) همیشه آخر می‌مونه
function buildPromotionGroups(products, configuredGroups) {
  const promoProducts = products.filter((product) => hasActivePromotion(product.promotion));
  const configuredBrands = new Set(configuredGroups.flatMap((group) => group.brands));

  const extraBrands = [...new Set(promoProducts.map((product) => product.brand))].filter(
    (brand) => !configuredBrands.has(brand),
  );

  const extraGroups = extraBrands.map((brand) => ({
    id: brand,
    brands: [brand],
    images: [],
  }));

  const brandGroups = configuredGroups.filter((group) => group.brands.length > 0);
  const otherGroups = configuredGroups.filter((group) => group.brands.length === 0);

  return [...brandGroups, ...extraGroups, ...otherGroups]
    .map((group) => ({
      ...group,
      products: [
        ...promoProducts.filter((product) => group.brands.includes(product.brand)),
        ...products.filter((product) => group.skus?.includes(product.sku)),
      ],
    }))
    .filter((group) => group.products.length > 0 || group.images.length > 0);
}

export default buildPromotionGroups;
