import { useRef } from "react";

import useProducts from "./hooks/useProducts";
import ProductSearch from "./sections/ProductSearch";
import ProductRows from "../common/ProductRows";
import ProductFilters from "./sections/ProductFilters";
import ScrollTopButton from "./sections/ScrollTopButton";

function Products() {
  const {
    filteredProducts,
    search,
    setSearch,
    values,
    setValue,
    onlyAvailable,
    setOnlyAvailable,
    clearFilters,
  } = useProducts();

  // فیلترها زنده اعمال می‌شن؛ دکمه‌ی «نمایش محصولات» کاربر رو به لیست می‌بره
  const listRef = useRef(null);
  const showProducts = () =>
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="px-5 mt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProductSearch search={search} setSearch={setSearch} />

        <div ref={listRef} className="scroll-mt-24">
          <ProductRows products={filteredProducts} />
        </div>

        <ProductFilters
          values={values}
          setValue={setValue}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          clearFilters={clearFilters}
          onSubmit={showProducts}
        />
      </div>

      <ScrollTopButton />
    </div>
  );
}

export default Products;
