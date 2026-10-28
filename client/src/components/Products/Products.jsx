import { useContext, useRef } from "react";

import LanguageContext from "../../context/LanguageContext";
import { usePageMeta } from "../../hooks/usePageMeta";

import useProductsPage from "./hooks/useProductsPage";
import { CategoryChips, ProductSearch, ProductFilters, ScrollTopButton } from "./sections";
import ProductRows from "../common/ProductRows";

function Products() {
  const { t } = useContext(LanguageContext);
  usePageMeta(t("nav.products"), t("meta.products"));

  const {
    filteredProducts,
    search,
    setSearch,
    values,
    setValue,
    onlyAvailable,
    setOnlyAvailable,
    clearFilters,
  } = useProductsPage();

  // فیلترها زنده اعمال می‌شن؛ دکمه‌ی «نمایش محصولات» کاربر رو به لیست می‌بره
  const listRef = useRef(null);
  const showProducts = () =>
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="px-5 mt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <ProductSearch search={search} setSearch={setSearch} />

          <CategoryChips />
        </div>

        {/* فیلترها بالای لیست تا کاربر موبایل برای رسیدن بهشون از کل لیست رد نشه */}
        <ProductFilters
          values={values}
          setValue={setValue}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          clearFilters={clearFilters}
          onSubmit={showProducts}
        />

        <div ref={listRef} className="scroll-mt-24">
          <ProductRows products={filteredProducts} />
        </div>
      </div>

      <ScrollTopButton />
    </div>
  );
}

export default Products;
