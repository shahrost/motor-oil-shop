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

  const [sort, setSort] = useState("");

  const brands = [
    ...new Set(products.map((product) => product.brand).filter(Boolean)),
  ];

  const viscosities = [
    ...new Set(products.map((product) => product.viscosity).filter(Boolean)),
  ];

  const volumes = [
    ...new Set(products.map((product) => product.volume).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const searchMatch =
      (product.name || "").toLowerCase().includes(searchText) ||
      (product.brand || "").toLowerCase().includes(searchText) ||
      (product.viscosity || "").toLowerCase().includes(searchText) ||
      (product.category || "").toLowerCase().includes(searchText) ||
      (product.volume || "").toLowerCase().includes(searchText);

    const viscosityMatch =
      selectedViscosity === "" || product.viscosity === selectedViscosity;

    const brandMatch = selectedBrand === "" || product.brand === selectedBrand;

    const volumeMatch =
      selectedVolume === "" || product.volume === selectedVolume;

    return searchMatch && viscosityMatch && brandMatch && volumeMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "cheap") {
      return Number(a.price || 0) - Number(b.price || 0);
    }

    if (sort === "expensive") {
      return Number(b.price || 0) - Number(a.price || 0);
    }

    if (sort === "name") {
      return (a.name || "").localeCompare(b.name || "");
    }

    if (sort === "new") {
      return b.id - a.id;
    }

    return 0;
  });

  function clearFilters() {
    setSearch("");
    setSelectedBrand("");
    setSelectedViscosity("");
    setSelectedVolume("");
    setSort("");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        محصولات روغن موتور
      </h1>

      <p className="text-center mt-3 text-gray-600">
        {sortedProducts.length} محصول موجود است
      </p>

      <div className="max-w-xl mx-auto mt-8">
        <input
          type="text"
          placeholder="جستجوی روغن موتور..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border"
        />
      </div>

      <div className="max-w-xs mt-6">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-3 rounded-lg border"
        >
          <option value="">مرتب سازی محصولات</option>

          <option value="new">جدیدترین محصولات</option>

          <option value="cheap">ارزان‌ترین</option>

          <option value="expensive">گران‌ترین</option>

          <option value="name">بر اساس نام</option>
        </select>
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-bold"
        >
          {showFilter ? "بستن فیلترها" : "نمایش فیلترها"}
        </button>
      </div>

      {showFilter && (
        <div className="bg-white max-w-4xl mx-auto mt-5 p-6 rounded-xl shadow">
          <h3 className="font-bold mb-3">انتخاب برند</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {["", ...brands].map((item) => (
              <button
                key={item || "all"}
                onClick={() => setSelectedBrand(item)}
                className={
                  selectedBrand === item
                    ? "bg-yellow-400 px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {item || "همه"}
              </button>
            ))}
          </div>

          <h3 className="font-bold mb-3">انتخاب گرید روغن</h3>

          <div className="flex flex-wrap gap-3 mb-6">
            {["", ...viscosities].map((item) => (
              <button
                key={item || "all"}
                onClick={() => setSelectedViscosity(item)}
                className={
                  selectedViscosity === item
                    ? "bg-yellow-400 px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {item || "همه"}
              </button>
            ))}
          </div>

          <h3 className="font-bold mb-3">انتخاب حجم</h3>

          <div className="flex flex-wrap gap-3">
            {["", ...volumes].map((item) => (
              <button
                key={item || "all"}
                onClick={() => setSelectedVolume(item)}
                className={
                  selectedVolume === item
                    ? "bg-yellow-400 px-4 py-2 rounded font-bold"
                    : "bg-gray-200 px-4 py-2 rounded"
                }
              >
                {item || "همه"}
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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-center mt-10 text-red-500 font-bold">
          محصولی پیدا نشد
        </p>
      )}
    </div>
  );
}

export default Products;
