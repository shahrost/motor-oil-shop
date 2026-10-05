import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import FilterSelect from "../../common/FilterSelect";
import { ALL } from "../../../utils/filterProducts";

// گزینه‌ی «همه» با placeholder هر فیلد نمایش داده می‌شه (مثل فیلتر سریع صفحه‌ی اصلی)
const withoutAll = (options) => options.filter((item) => item.value !== ALL);
const toSelectValue = (value) => (value === ALL ? "" : value);

// «API» قبل از سطح کیفیت نوشته می‌شه، به‌جز استانداردهای JASO
const formatApiLabel = (item) =>
  item.label.startsWith("JASO") ? item.label : `API ${item.label}`;

function ProductFilters({
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

  // همان ترتیب فیلتر سریع صفحه‌ی اصلی: گرید/API/لیتراژ، برند/نوع/قیمت
  const fields = [
    {
      key: "viscosity",
      label: t("common.viscosityLabel"),
      placeholder: t("home.quickFilter.allViscosities"),
      options: viscosities,
      value: viscosity,
      onChange: setViscosity,
    },
    {
      key: "api",
      label: t("common.apiLabel"),
      placeholder: t("home.quickFilter.allApis"),
      options: apiOptions,
      value: api,
      onChange: setApi,
      formatLabel: formatApiLabel,
    },
    {
      key: "volume",
      label: t("common.volumeLabel"),
      placeholder: t("home.quickFilter.allVolumes"),
      options: volumes,
      value: volume,
      onChange: setVolume,
    },
    {
      key: "brand",
      label: t("common.brandLabel"),
      placeholder: t("home.quickFilter.allBrands"),
      options: brands,
      value: brand,
      onChange: setBrand,
    },
    {
      key: "productType",
      label: t("common.productTypeLabel"),
      placeholder: t("home.quickFilter.allTypes"),
      options: productTypeOptions,
      value: productType,
      onChange: setProductType,
    },
  ];

  return (
    <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-extrabold">{t("products.filters.title")}</h2>

        <button
          type="button"
          onClick={clearFilters}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-sm sm:text-base"
        >
          {t("products.filters.clear")}
        </button>
      </div>

      {/* همیشه دو ردیف سه‌تایی؛ روی موبایل فونت و فاصله‌ها کوچک‌تر */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {fields.map((field) => (
          <FilterSelect
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            options={withoutAll(field.options)}
            value={toSelectValue(field.value)}
            onChange={(value) => field.onChange(value || ALL)}
            formatLabel={field.formatLabel}
            labelClassName={LABEL_CLASS}
            className={SELECT_CLASS}
          />
        ))}

        <FilterSelect
          label={t("common.priceLabel")}
          options={priceOptions}
          value={priceOption}
          onChange={setPriceOption}
          labelClassName={LABEL_CLASS}
          className={SELECT_CLASS}
        />
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
  );
}

const LABEL_CLASS =
  "block font-bold text-gray-700 mb-2 text-xs sm:text-base truncate";
const SELECT_CLASS =
  "w-full border border-gray-300 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-xs sm:text-base text-black";

export default ProductFilters;
