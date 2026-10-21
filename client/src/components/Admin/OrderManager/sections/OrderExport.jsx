import useOrderExport from "../hooks/useOrderExport";
import { JALALI_MONTHS, toPersianDigits } from "../../../../utils/jalaliDate";

const FIELD_CLASS = "border p-3 rounded-lg bg-white text-black";

// دریافت اکسل ماهانه‌ی سفارش‌ها (انتخاب ماه و سال شمسی؛ پیش‌فرض ماه جاری)
function OrderExport() {
  const { year, setYear, month, setMonth, years, downloading, message, download } =
    useOrderExport();

  return (
    <section className="bg-white rounded-xl shadow p-4 sm:p-5 mb-4">
      <h2 className="font-bold text-lg mb-3">📊 گزارش اکسل ماهانه</h2>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={`${FIELD_CLASS} flex-1 min-w-28`}
          aria-label="ماه"
        >
          {JALALI_MONTHS.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={`${FIELD_CLASS} flex-1 min-w-24`}
          aria-label="سال"
        >
          {years.map((item) => (
            <option key={item} value={item}>
              {toPersianDigits(item)}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={download}
          disabled={downloading}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg"
        >
          {downloading ? "در حال ساخت فایل..." : "⬇️ دریافت اکسل"}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-3 font-bold ${message.type === "error" ? "text-red-600" : "text-amber-700"}`}
        >
          {message.text}
        </p>
      )}
    </section>
  );
}

export default OrderExport;
