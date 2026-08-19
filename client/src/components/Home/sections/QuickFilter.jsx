import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBrands,
  getViscosities,
  getVolumes,
  getPriceOptions,
} from "../../../utils/productFilters";

const brands = getBrands().filter((item) => item !== "همه");
const viscosities = getViscosities().filter((item) => item !== "همه");
const volumes = getVolumes().filter((item) => item !== "همه");
const priceOptions = getPriceOptions();

function QuickFilter() {
  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [viscosity, setViscosity] = useState("");
  const [volume, setVolume] = useState("");
  const [priceOption, setPriceOption] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (viscosity) params.set("viscosity", viscosity);
    if (volume) params.set("volume", volume);

    if (priceOption.startsWith("sort:")) {
      params.set("sort", priceOption.replace("sort:", ""));
    } else if (priceOption.startsWith("range:")) {
      params.set("priceRange", priceOption.replace("range:", ""));
    }

    navigate(`/products?${params.toString()}`);
  }

  return (
    <section className="px-5 mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-6"
      >
        <h2 className="text-xl font-extrabold mb-5">فیلتر سریع محصولات</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-2">
              برند
            </label>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">همه برندها</option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              گرید
            </label>

            <select
              value={viscosity}
              onChange={(e) => setViscosity(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">همه گریدها</option>

              {viscosities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              لیتراژ
            </label>

            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">همه لیتراژها</option>

              {volumes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              قیمت
            </label>

            <select
              value={priceOption}
              onChange={(e) => setPriceOption(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-2xl"
        >
          نمایش محصولات
        </button>
      </form>
    </section>
  );
}

export default QuickFilter;
