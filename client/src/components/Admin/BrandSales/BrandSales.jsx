import { PHONE_DISPLAY } from "../../../data/contact";
import useBrandSales from "./hooks/useBrandSales";

export default function BrandSales() {
  const { selected, select, closedBrands, closed, busy, error, message, brands, load, save } = useBrandSales();

  return <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5" dir="rtl" aria-label="مدیریت فروش برندها">
    <h2 className="text-xl font-extrabold">بستن فروش برند و استعلام پیامکی</h2>
    <p className="my-3 text-sm leading-8 text-gray-600">با بستن فروش، قیمت و خرید محصولات برند به «استعلام قیمت با پیامک» تبدیل می‌شود. قیمت‌ها حفظ می‌شوند و هر زمان می‌توانید فروش را دوباره باز کنید.</p>
    <label className="block text-sm font-bold">انتخاب برند برای وضعیت فروش
      <select value={selected} disabled={busy} onChange={(event) => select(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-gray-300 bg-white p-3">
        <option value="">برند را انتخاب کنید</option>
        {brands.map((brand) => <option key={brand} value={brand}>{brand}{closedBrands.includes(brand) ? " — فروش بسته" : ""}</option>)}
      </select>
    </label>
    {selected && <p className="mt-3 text-sm">وضعیت فعلی: {closed ? "فروش بسته؛ استعلام پیامکی" : "فروش باز"}</p>}
    <button type="button" disabled={!selected || busy || !!error} onClick={save} className="mt-4 min-h-12 w-full rounded-xl bg-gray-900 px-4 py-3 font-bold text-white disabled:opacity-40">
      {busy ? "در حال دریافت و ثبت…" : closed ? "بازکردن فروش این برند" : "بستن فروش و فعال‌کردن استعلام پیامکی"}
    </button>
    <p className="mt-3 text-xs leading-7 text-gray-600">پیامک مشتری به شماره <bdi>{PHONE_DISPLAY}</bdi> باز می‌شود؛ مشتری ارسال را در برنامه پیامک گوشی انجام می‌دهد.</p>
    {message && <p role="status" className="mt-3 rounded-xl bg-green-50 p-3 text-sm leading-8 text-green-900">{message}</p>}
    {error && <div role="alert" className="mt-3 text-sm leading-8 text-red-700">{error}<button type="button" onClick={load} disabled={busy} className="block min-h-11 underline">دریافت دوباره وضعیت</button></div>}
    {closedBrands.length > 0 && <p className="mt-3 text-sm leading-8">برندهای فروش‌بسته: {closedBrands.join("، ")}</p>}
  </section>;
}
