import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import FilterSelect from "../../common/FilterSelect";
import getFilterFields from "../../../utils/filterFields";
import { ALL } from "../../../utils/filterProducts";

// «API» قبل از سطح کیفیت نوشته می‌شه، به‌جز استانداردهای JASO
const formatApiLabel = (item) =>
  item.label.startsWith("JASO") ? item.label : `API ${item.label}`;

// فیلدهای «همه» در state صفحه با ALL نگه داشته می‌شن و در select با ""
const toSelectValue = (value) => (value === ALL ? "" : value);

const LABEL_CLASS =
  "block font-bold text-gray-700 mb-2 text-xs sm:text-base truncate";
const SELECT_CLASS =
  "w-full border border-gray-300 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-xs sm:text-base text-black";

// همان ظاهر فیلتر سریع صفحه‌ی اصلی + پاک کردن فیلترها، «فقط موجودها» و دکمه‌ی نمایش محصولات
function ProductFilters({
  values,
  setValue,
  onlyAvailable,
  setOnlyAvailable,
  clearFilters,
  onSubmit,
}) {
  const { language, t } = useContext(LanguageContext);

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
        {getFilterFields(language, t).map((field) => (
          <FilterSelect
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            options={field.options}
            value={toSelectValue(values[field.key])}
            onChange={(value) => setValue(field.key, value || ALL)}
            formatLabel={field.key === "api" ? formatApiLabel : undefined}
            labelClassName={LABEL_CLASS}
            className={SELECT_CLASS}
          />
        ))}
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

      <button
        type="button"
        onClick={onSubmit}
        className="w-full sm:w-auto mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-2xl"
      >
        {t("products.filters.submit")}
      </button>
    </section>
  );
}

export default ProductFilters;
