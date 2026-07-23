import { useState, useContext } from "react";
import ProductContext from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function Products() {
  const { products } = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [selectedViscosity, setSelectedViscosity] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedVolume, setSelectedVolume] = useState("");

  const brands = [...new Set(products.map((product) => product.brand))];

  const viscosities = [
    ...new Set(products.map((product) => product.viscosity)),
  ];

  const volumes = [...new Set(products.map((product) => product.volume))];

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      product.name.toLowerCase().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText) ||
      product.viscosity.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.volume.toLowerCase().includes(searchText);

    const viscosityMatch =
      selectedViscosity === "" || product.viscosity === selectedViscosity;

    const brandMatch = selectedBrand === "" || product.brand === selectedBrand;

    const volumeMatch =
      selectedVolume === "" || product.volume === selectedVolume;

    return searchMatch && viscosityMatch && brandMatch && volumeMatch;
  });

  function clearFilters() {
    setSearch("");
    setSelectedBrand("");
    setSelectedViscosity("");
    setSelectedVolume("");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        محصولات روغن موتور
      </h1>

      <p className="text-center mt-3 text-gray-600">
        {filteredProducts.length} محصول موجود است
      </p>

      {/* Search */}

      <div className="max-w-xl mx-auto mt-8">
        <input
          type="text"
          placeholder="جستجوی روغن موتور..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border"
        />
      </div>

      {/* Filter Button */}

      <div className="text-center mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-bold"
        >
          {showFilter ? "بستن فیلترها" : "نمایش فیلترها"}
        </button>
      </div>
      {/* Active Filters */}

      {(selectedBrand || selectedViscosity || selectedVolume || search) && (
        <div className="max-w-4xl mx-auto mt-6 bg-white p-4 rounded-xl shadow">
          <h3 className="font-bold mb-3">فیلترهای فعال:</h3>

          <div className="flex flex-wrap gap-3">
            {search && (
              <span className="bg-gray-200 px-4 py-2 rounded-lg">
                🔍 جستجو: {search}
              </span>
            )}

            {selectedBrand && (
              <span className="bg-yellow-400 px-4 py-2 rounded-lg">
                برند: {selectedBrand}
              </span>
            )}

            {selectedViscosity && (
              <span className="bg-yellow-400 px-4 py-2 rounded-lg">
                گرید: {selectedViscosity}
              </span>
            )}

            {selectedVolume && (
              <span className="bg-yellow-400 px-4 py-2 rounded-lg">
                حجم: {selectedVolume}
              </span>
            )}
          </div>
        </div>
      )}
      {/* Filters */}

      {showFilter && (
        <div className="bg-white max-w-4xl mx-auto mt-5 p-6 rounded-xl shadow">
          {/* Brand */}

          <h3 className="font-bold mb-3">انتخاب برند</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedBrand("")}
              className={
                selectedBrand === ""
                  ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                  : "bg-black text-white px-4 py-2 rounded"
              }
            >
              همه
            </button>

            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={
                  selectedBrand === brand
                    ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Viscosity */}

          <h3 className="font-bold mb-3">انتخاب گرید روغن</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setSelectedViscosity("")}
              className={
                selectedViscosity === ""
                  ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                  : "bg-black text-white px-4 py-2 rounded"
              }
            >
              همه
            </button>

            {viscosities.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedViscosity(item)}
                className={
                  selectedViscosity === item
                    ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {item}
              </button>
            ))}
          </div>

          {/* Volume */}

          <h3 className="font-bold mb-3">انتخاب حجم</h3>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedVolume("")}
              className={
                selectedVolume === ""
                  ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                  : "bg-black text-white px-4 py-2 rounded"
              }
            >
              همه
            </button>

            {volumes.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedVolume(item)}
                className={
                  selectedVolume === item
                    ? "bg-yellow-400 text-black px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="mt-6 bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            پاک کردن همه فیلترها
          </button>
        </div>
      )}

      {/* Products */}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center mt-10 text-red-500 font-bold">
          محصولی پیدا نشد
        </p>
      )}
    </div>
  );
}

export default Products;
