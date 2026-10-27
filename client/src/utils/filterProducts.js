import priceRanges from "../data/productOptions/priceRanges";
import { normalizeViscosity, normalizeVolume, normalizeApi } from "./normalizeSpec";
import { classifyProductType } from "./classifyProductType";
import { normalizeSearchText, searchWords } from "./searchText";
import { getProductTypeSpec } from "./productTypeSpec";
import { getProductNameLabel } from "./productNameLabel";
import getBrandLabel from "./brandLabel";
import { formatVolume } from "./formatVolume";

export const ALL = "همه";

// هر چیزی که روی کارت محصول نوشته شده (اسم و برند به هر دو زبان، گرید، API،
// حجم، نوع گیربکس اتوماتیک مثل CVT/DCT/AL4، استاندارد روغن ترمز مثل DOT4،
// دسته و کد کالا) جستجوپذیره. متن یکسان‌سازی می‌شه تا «۵w۳۰»، «5W-30» و
// «5w30» یکی دیده بشن؛ نسخه‌ی بی‌فاصله برای همین «5w30» ← «5w 30» هم چک می‌شه.
const searchIndexCache = new WeakMap();

function getSearchIndex(product) {
  if (searchIndexCache.has(product)) return searchIndexCache.get(product);

  const typeSpec = getProductTypeSpec(product);
  const text = normalizeSearchText(
    [
      product.name,
      getProductNameLabel(product.name, "en"),
      product.brand,
      getBrandLabel(product.brand, "en"),
      product.sku,
      product.category,
      product.oilType,
      product.viscosity,
      product.api,
      product.volume,
      formatVolume(product.volume, "en"),
      typeSpec?.value,
    ]
      .filter(Boolean)
      .join(" "),
  );
  const index = { text, compact: text.replace(/ /g, "") };

  searchIndexCache.set(product, index);
  return index;
}

function matchesSearch(product, search) {
  const words = searchWords(search);
  if (!words.length) return true;

  const { text, compact } = getSearchIndex(product);

  return words.every((word) => text.includes(word) || compact.includes(word));
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
