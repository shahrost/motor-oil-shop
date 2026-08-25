import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageContext from "../../../context/LanguageContext";
import {
  getBrands,
  getViscosities,
  getVolumes,
  getApiOptions,
  getPriceOptions,
} from "../../../utils/productFilters";
import { getProductTypeOptions } from "../../../utils/classifyProductType";

function QuickFilter() {
  const navigate = useNavigate();
  const { language, t } = useContext(LanguageContext);

  const brands = getBrands(language).filter((item) => item.value !== "همه");
  const viscosities = getViscosities(language).filter(
    (item) => item.value !== "همه",
  );
  const volumes = getVolumes(language).filter((item) => item.value !== "همه");
  const apis = getApiOptions(language).filter((item) => item.value !== "همه");
  const productTypes = getProductTypeOptions(language).filter(
    (item) => item.value !== "همه",
  );
  const priceOptions = getPriceOptions(language);

  const [brand, setBrand] = useState("");
  const [viscosity, setViscosity] = useState("");
  const [volume, setVolume] = useState("");
  const [api, setApi] = useState("");
  const [productType, setProductType] = useState("");
  const [priceOption, setPriceOption] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (viscosity) params.set("viscosity", viscosity);
    if (volume) params.set("volume", volume);
    if (api) params.set("api", api);
    if (productType) params.set("productType", productType);

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
        <h2 className="text-xl font-extrabold mb-5">
          {t("home.quickFilter.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.brandLabel")}
            </label>

            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">{t("home.quickFilter.allBrands")}</option>

              {brands.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.viscosityLabel")}
            </label>

            <select
              value={viscosity}
              onChange={(e) => setViscosity(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">{t("home.quickFilter.allViscosities")}</option>

              {viscosities.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.volumeLabel")}
            </label>

            <select
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">{t("home.quickFilter.allVolumes")}</option>

              {volumes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.productTypeLabel")}
            </label>

            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">{t("home.quickFilter.allTypes")}</option>

              {productTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.apiLabel")}
            </label>

            <select
              value={api}
              onChange={(e) => setApi(e.target.value)}
              className="w-full border border-gray-300 rounded-2xl p-3 text-black"
            >
              <option value="">{t("home.quickFilter.allApis")}</option>

              {apis.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-2">
              {t("common.priceLabel")}
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
          {t("home.quickFilter.submit")}
        </button>
      </form>
    </section>
  );
}

export default QuickFilter;
