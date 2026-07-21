import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Products() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedViscosity, setSelectedViscosity] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const viscosityMatch =
      selectedViscosity === "" || product.viscosity === selectedViscosity;

    return searchMatch && viscosityMatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
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
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

      {/* Filters */}
      {showFilter && (
        <div className="bg-white max-w-xl mx-auto mt-5 p-5 rounded-lg shadow">
          <p className="font-bold mb-4">انتخاب گرید روغن</p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedViscosity("")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              همه
            </button>

            <button
              onClick={() => setSelectedViscosity("10W40")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              10W40
            </button>

            <button
              onClick={() => setSelectedViscosity("20W50")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              20W50
            </button>

            <button
              onClick={() => setSelectedViscosity("5W30")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              5W30
            </button>
          </div>
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
