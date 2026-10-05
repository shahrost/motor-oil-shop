import { useContext, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import { filterProducts, ALL } from "../../../utils/filterProducts";

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

// مقدار اولیه‌ی فیلترها از آدرس (مثلاً وقتی از فیلتر سریع صفحه‌ی اصلی میاد)
function filtersFromUrl(searchParams) {
  const filters = { ...DEFAULT_FILTERS };

  ["search", "brand", "viscosity", "volume", "api", "productType", "priceRange", "sort"].forEach(
    (key) => {
      const value = searchParams.get(key);
      if (value) filters[key] = value;
    },
  );

  return filters;
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

// state فیلترهای صفحه‌ی محصولات + گزینه‌های هر فیلتر + لیست فیلترشده
function useProducts() {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => filtersFromUrl(searchParams));

  const setFilter = (key) => (value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters]);

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

export default useProducts;
