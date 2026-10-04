import priceRanges from "../data/productOptions/priceRanges";
import { normalizeViscosity, normalizeVolume, normalizeApi } from "./normalizeSpec";
import { classifyProductType } from "./classifyProductType";

export const ALL = "همه";

function matchesSearch(product, search) {
  if (!search.trim()) return true;

  const words = search.toLowerCase().trim().split(/\s+/);
  const haystack =
    `${product.name} ${product.brand} ${product.sku || ""} ${product.category} ${product.viscosity} ${product.volume} ${product.oilType || ""}`.toLowerCase();

  return words.every((word) => haystack.includes(word));
}

function matchesPriceRange(product, priceRange) {
  if (priceRange === ALL) return true;

  const range = priceRanges.find((item) => item.id === priceRange);

  if (!range) return true;

  const price = Number(product.price);

  return price >= range.min && price <= range.max;
}

const SORTERS = {
  cheap: (a, b) => Number(a.price) - Number(b.price),
  expensive: (a, b) => Number(b.price) - Number(a.price),
  new: (a, b) => Number(b.id) - Number(a.id),
  best: (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller),
};

// فیلتر و مرتب‌سازی لیست محصولات صفحه‌ی محصولات (تابع خالص، بدون state)
export function filterProducts(products, filters) {
  const { search, brand, viscosity, volume, api, productType, priceRange, sort, onlyAvailable } =
    filters;

  const result = products.filter(
    (product) =>
      matchesSearch(product, search) &&
      (brand === ALL || product.brand === brand) &&
      (viscosity === ALL ||
        normalizeViscosity(product.viscosity) === normalizeViscosity(viscosity)) &&
      (volume === ALL || normalizeVolume(product.volume) === normalizeVolume(volume)) &&
      (api === ALL || normalizeApi(product.api).includes(normalizeApi(api))) &&
      (productType === ALL || classifyProductType(product.category) === productType) &&
      matchesPriceRange(product, priceRange) &&
      (!onlyAvailable || product.stock !== 0),
  );

  return SORTERS[sort] ? result.sort(SORTERS[sort]) : result;
}

export default filterProducts;
