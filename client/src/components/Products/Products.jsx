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

  return (
    <div className="px-5 mt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProductSearch search={search} setSearch={setSearch} />

        <ProductRows products={filteredProducts} />

        <ProductFilters
          values={values}
          setValue={setValue}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          clearFilters={clearFilters}
        />
      </div>

      <ScrollTopButton />
    </div>
  );
}

export default Products;
