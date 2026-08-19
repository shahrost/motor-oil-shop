import useProducts from "./hooks/useProducts";
import ProductFilters from "./sections/ProductFilters";
import ProductGrid from "./sections/ProductGrid";
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

    priceOption,
    setPriceOption,

    onlyAvailable,
    setOnlyAvailable,

    brands,
    viscosities,
    volumes,
    priceOptions,

    showTop,

    clearFilters,
    scrollToTop,
  } = useProducts();

  return (
    <div>
      <ProductFilters
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        viscosity={viscosity}
        setViscosity={setViscosity}
        volume={volume}
        setVolume={setVolume}
        priceOption={priceOption}
        setPriceOption={setPriceOption}
        onlyAvailable={onlyAvailable}
        setOnlyAvailable={setOnlyAvailable}
        brands={brands}
        viscosities={viscosities}
        volumes={volumes}
        priceOptions={priceOptions}
        clearFilters={clearFilters}
      />

      <ProductGrid products={filteredProducts} />

      <ScrollTopButton show={showTop} onClick={scrollToTop} />
    </div>
  );
}

export default Products;
