import { normalizeSearchText, searchWords } from "../../../../utils/searchText";

export const UNBRANDED = "~unbranded";
export const adminBrandKey = (brand) => String(brand || "").trim() || UNBRANDED;
export const adminBrandLabel = (brand) => brand === UNBRANDED ? "بدون برند" : brand;
export const adminBrandPath = (brand) => `/admin/products/${encodeURIComponent(brand)}`;

export function buildAdminBrands(products, configuredBrands) {
  const counts = new Map(configuredBrands.map(({ name }) => [name, 0]));
  for (const product of products) {
    const key = adminBrandKey(product.brand);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts].map(([key, count]) => ({ key, label: adminBrandLabel(key), count }));
}

export function filterAdminProducts(products, brand, query) {
  const words = searchWords(query);
  return products.filter((product) => {
    if (adminBrandKey(product.brand) !== brand) return false;
    const text = normalizeSearchText([
      product.name, product.sku, product.brand, product.category,
      product.viscosity, product.volume, product.api, product.oilType,
    ].filter(Boolean).join(" "));
    const compact = text.replace(/ /g, "");
    return words.every((word) => text.includes(word) || compact.includes(word));
  });
}
