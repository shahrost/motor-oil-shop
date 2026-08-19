function ProductFilters({
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
  clearFilters,
}) {
  return (
    <section className="bg-white rounded-3xl shadow-md p-5 mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold">فیلتر محصولات</h2>

        <button
          type="button"
          onClick={clearFilters}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold"
        >
          پاک کردن
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 جستجوی محصول، برند، گرید..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl p-4 text-black mb-5"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border rounded-2xl p-3 bg-white text-black"
        >
          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={viscosity}
          onChange={(e) => setViscosity(e.target.value)}
          className="border rounded-2xl p-3 bg-white text-black"
        >
          {viscosities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="border rounded-2xl p-3 bg-white text-black"
        >
          {volumes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={priceOption}
          onChange={(e) => setPriceOption(e.target.value)}
          className="border rounded-2xl p-3 bg-white text-black"
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-3 mt-5 cursor-pointer">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.checked)}
          className="w-5 h-5"
        />

        <span className="font-bold">فقط محصولات موجود</span>
      </label>
    </section>
  );
}

export default ProductFilters;
