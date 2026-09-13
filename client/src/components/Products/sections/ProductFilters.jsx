import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ProductFilters({
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
  clearFilters,
}) {
  const { t } = useContext(LanguageContext);

  return (
    <>
      <div className="max-w-5xl sm:max-w-md mx-auto bg-white rounded-3xl shadow p-3 sm:p-2 flex gap-2 mb-5">
        <input
          type="text"
          placeholder={t("products.filters.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            min-w-0
            border
            border-gray-300
            rounded-2xl
            p-3
            sm:p-2
            text-black
            outline-none
            focus:ring-2
            focus:ring-yellow-400
          "
        />

        <span
          className="
            shrink-0
            w-12
            sm:w-10
            rounded-2xl
            bg-yellow-400
            flex
            items-center
            justify-center
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 sm:w-4 sm:h-4"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>

      <section className="bg-white rounded-3xl shadow-md p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-extrabold">{t("products.filters.title")}</h2>

          <button
            type="button"
            onClick={clearFilters}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold"
          >
            {t("products.filters.clear")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border rounded-2xl p-3 bg-white text-black"
          >
            {brands.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="border rounded-2xl p-3 bg-white text-black"
          >
            {productTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={viscosity}
            onChange={(e) => setViscosity(e.target.value)}
            className="border rounded-2xl p-3 bg-white text-black"
          >
            {viscosities.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="border rounded-2xl p-3 bg-white text-black"
          >
            {volumes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={api}
            onChange={(e) => setApi(e.target.value)}
            className="border rounded-2xl p-3 bg-white text-black"
          >
            {apiOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.value === "همه" || item.label.startsWith("JASO")
                  ? item.label
                  : `API ${item.label}`}
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

          <span className="font-bold">{t("products.filters.onlyAvailable")}</span>
        </label>
      </section>
    </>
  );
}

export default ProductFilters;
