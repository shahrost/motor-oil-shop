import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import FilterSelect from "../../common/FilterSelect";
import useQuickFilter from "../hooks/useQuickFilter";

function QuickFilter() {
  const { language, t } = useContext(LanguageContext);
  const { fields, values, setValue, submit } = useQuickFilter(language, t);

  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  return (
    <section className="px-5 mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow p-4 sm:p-6"
      >
        <h2 className="text-xl font-extrabold mb-5">
          {t("home.quickFilter.title")}
        </h2>

        {/* همیشه دو ردیف سه‌تایی؛ روی موبایل فونت و فاصله‌ها کوچک‌تر */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {fields.map((field) => (
            <FilterSelect
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              options={field.options}
              value={values[field.key]}
              onChange={(value) => setValue(field.key, value)}
              labelClassName="block font-bold text-gray-700 mb-2 text-xs sm:text-base truncate"
              className="w-full border border-gray-300 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-xs sm:text-base text-black"
            />
          ))}
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
