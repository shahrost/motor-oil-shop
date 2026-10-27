import { useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import { filterProducts, ALL } from "../../../utils/filterProducts";
import {
  getCachedCompatibility,
  loadCompatibility,
} from "../../../services/filterCompatibilityCache";

const DEFAULT_FILTERS = {
  search: "",
  brand: ALL,
  viscosity: ALL,
  volume: ALL,
  api: ALL,
  productType: ALL,
  priceRange: ALL,
  sort: "default",
  onlyAvailable: false,
};

const URL_KEYS = ["search", "brand", "viscosity", "volume", "api", "productType", "priceRange", "sort"];

// فیلترها در آدرس (query) نگه داشته می‌شن تا با Back از صفحه‌ی محصول همون فیلترها
// برگرده و لینک فیلتر سریع صفحه‌ی اصلی هم کار کنه
function filtersFromUrl(searchParams) {
  const filters = { ...DEFAULT_FILTERS };

  URL_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  });

  filters.onlyAvailable = searchParams.get("available") === "1";

  return filters;
}

// فقط فیلترهای غیرپیش‌فرض در آدرس نوشته می‌شن
function filtersToUrl(filters) {
  const params = {};

  URL_KEYS.forEach((key) => {
    if (filters[key] !== DEFAULT_FILTERS[key]) params[key] = filters[key];
  });

  if (filters.onlyAvailable) params.available = "1";

  return params;
}

// «قیمت» در UI یک لیست است که هم مرتب‌سازی و هم بازه‌ی قیمت رو انتخاب می‌کنه
function toPriceOption({ sort, priceRange }) {
  if (sort === "cheap" || sort === "expensive") return `sort:${sort}`;
  if (priceRange !== ALL) return `range:${priceRange}`;
  return "";
}

function fromPriceOption(value) {
  if (value.startsWith("sort:")) return { sort: value.replace("sort:", ""), priceRange: ALL };
  if (value.startsWith("range:")) return { sort: "default", priceRange: value.replace("range:", "") };
  return { sort: "default", priceRange: ALL };
}

// state فیلترهای صفحه‌ی محصولات (همگام با آدرس) + گزینه‌های هر فیلتر + لیست فیلترشده
function useProductsPage() {
  const { products } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // state محلی تا تایپ در جستجو روان بمونه (آپدیت آدرس در روتر با transition انجام می‌شه)
  const [filters, setFilters] = useState(() => filtersFromUrl(searchParams));

  const setFilter = (key) => (value) => setFilters((prev) => ({ ...prev, [key]: value }));

  // آدرس آینه‌ی فیلترهاست؛ replace تا هر تغییر فیلتر صفحه‌ی جدیدی به تاریخچه اضافه نکنه.
  // مقایسه‌ی رشته جلوی حلقه‌ی بی‌پایان رو می‌گیره
  useEffect(() => {
    const next = new URLSearchParams(filtersToUrl(filters));

    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  // خودروهای سازگار فیلترها (برای جستجوی «پراید») فقط وقتی چیزی جستجو شد گرفته می‌شه؛
  // همون درخواست مشترک کارت‌هاست و اگه قبلاً اومده باشه دوباره نمی‌ره
  const [compatibility, setCompatibility] = useState(getCachedCompatibility);
  const hasSearch = Boolean(filters.search.trim());

  useEffect(() => {
    if (!hasSearch || compatibility) return undefined;

    let active = true;

    loadCompatibility()
      .then((result) => active && setCompatibility(result))
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [hasSearch, compatibility]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters, compatibility),
    [products, filters, compatibility],
  );

  return {
    filteredProducts,

    search: filters.search,
    setSearch: setFilter("search"),

    // مقادیر فیلدهای فیلتر (کلیدها مثل utils/filterFields)
    values: {
      viscosity: filters.viscosity,
      api: filters.api,
      volume: filters.volume,
      brand: filters.brand,
      productType: filters.productType,
      priceOption: toPriceOption(filters),
    },
    setValue: (key, value) =>
      setFilters((prev) => ({
        ...prev,
        ...(key === "priceOption" ? fromPriceOption(value) : { [key]: value }),
      })),

    onlyAvailable: filters.onlyAvailable,
    setOnlyAvailable: setFilter("onlyAvailable"),

    clearFilters: () => setFilters(DEFAULT_FILTERS),
  };
}

export default useProductsPage;
