import useProducts from "./hooks/useProducts";
import ProductSearch from "./sections/ProductSearch";
import ProductRows from "./sections/ProductRows";
import ProductFilters from "./sections/ProductFilters";
import ScrollTopButton from "./sections/ScrollTopButton";

function Products() {
  const {
    filteredProducts,

    search,
    setSearch,

    brand,
    setBrand,

    viscosity,
    setViscosity,

    volume,
    setVolume,

    api,
    setApi,

    productType,
    setProductType,

    priceOption,
    setPriceOption,

    onlyAvailable,
    setOnlyAvailable,

    brands,
    viscosities,
    volumes,
    apiOptions,
    productTypeOptions,
    priceOptions,

    showTop,

    clearFilters,
    scrollToTop,
  } = useProducts();

  return (
    <div className="px-5 mt-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ProductSearch search={search} setSearch={setSearch} />

        <ProductRows products={filteredProducts} />

        <ProductFilters
          brand={brand}
          setBrand={setBrand}
          viscosity={viscosity}
          setViscosity={setViscosity}
          volume={volume}
          setVolume={setVolume}
          api={api}
          setApi={setApi}
          productType={productType}
          setProductType={setProductType}
          priceOption={priceOption}
          setPriceOption={setPriceOption}
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          brands={brands}
          viscosities={viscosities}
          volumes={volumes}
          apiOptions={apiOptions}
          productTypeOptions={productTypeOptions}
          priceOptions={priceOptions}
          clearFilters={clearFilters}
        />
      </div>

      <ScrollTopButton show={showTop} onClick={scrollToTop} />
    </div>
  );
}

export default Products;
