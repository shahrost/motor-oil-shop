import { Link } from "react-router-dom";
import { Upload, Check, ScanLine, TriangleAlert } from "lucide-react";
import usePriceManager from "./hooks/usePriceManager";
import formatPrice from "../../../utils/formatPrice";

export default function PriceManager() {
  const { run, undo, busy, progress, error, result, fileName, pages, cancel,
    cashDiscount, chooseDiscount, waitingForDiscount, waitingForUnit, chooseUnit } = usePriceManager();
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-6" dir="rtl">
      <Link to="/admin" className="mb-5 inline-block min-h-11 py-2 text-sm text-gray-600">← بازگشت به پنل مدیریت</Link>
      <header className="mb-7 flex items-start gap-3">
        <span className="rounded-2xl bg-yellow-100 p-3 text-yellow-800"><ScanLine size={28} /></span>
        <div><h1 className="text-2xl font-extrabold">بروزرسانی خودکار قیمت‌ها</h1>
          <p className="mt-3 text-sm leading-8 text-gray-600">درصد تخفیف نقدی و عکس یا PDF لیست شرکت را انتخاب کنید. قیمت‌ها خودکار روی سایت ثبت می‌شوند.</p></div>
      </header>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <label className="mb-5 block text-sm font-bold">درصد تخفیف نقدی
          <select value={cashDiscount} disabled={!!busy} onChange={(event) => chooseDiscount(event.target.value)} aria-label="درصد تخفیف نقدی"
            aria-describedby="cash-discount-help" className="mt-2 min-h-12 w-full rounded-xl border border-gray-300 bg-white p-3">
            <option value="">از ۱ تا ۹۰ درصد انتخاب کنید</option>
            {Array.from({ length: 90 }, (_, index) => index + 1).map((percent) => <option key={percent} value={percent}>{percent.toLocaleString("fa-IR")} درصد</option>)}
          </select>
        </label>
        <p id="cash-discount-help" className="mb-5 text-sm leading-8 text-gray-600">قیمت نقدی به اندازه درصد انتخابی از مبلغ همین لیست کمتر می‌شود. قیمت چکی برابر مبلغ لیست است؛ تخفیف دوباره روی قیمت قبلی اعمال نمی‌شود.</p>
        {result && Number(cashDiscount) !== result.cashDiscountPercent && <p className="mb-4 text-sm leading-8 text-amber-800">برای اعمال درصد جدید، فایل را دوباره انتخاب کنید.</p>}
        <label className={`flex min-h-44 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-yellow-400 bg-yellow-50 p-6 text-center ${busy ? "opacity-60" : "cursor-pointer hover:bg-yellow-100"}`}>
          <Upload size={36} className="text-yellow-800" />
          <span className="text-lg font-bold">انتخاب عکس یا PDF و بروزرسانی سایت</span>
          <span className="text-sm leading-7 text-gray-600">از گالری یا فایل‌های ذخیره‌شده از بله</span>
          <input type="file" accept="application/pdf,image/*,.pdf,.jpg,.jpeg,.png,.webp,.avif,.bmp,.gif,.heic,.heif,.tif,.tiff" className="sr-only"
            disabled={!!busy} aria-label="انتخاب لیست و بروزرسانی خودکار قیمت‌ها"
            onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ""; run(file); }} />
        </label>
        <p className="mt-4 text-xs leading-7 text-gray-600">حداکثر ۲۰ مگابایت و ۱۰۰ صفحه. با انتخاب فایل و درصد، ثبت خودکار شروع می‌شود؛ تا پایان، صفحه را باز نگه دارید.</p>
        <p className="mt-2 text-xs leading-7 text-gray-600">برای همهٔ برندهای سایت: تطبیق با کد کالا یا برند، حجم و مشخصات دقیق انجام می‌شود. ردیف‌های مبهم ثبت نمی‌شوند و دلیل آن‌ها نمایش داده می‌شود. واحد ریال یا تومان باید در لیست مشخص باشد.</p>
        {fileName && <p className="mt-3 break-all text-sm text-gray-600">فایل: {fileName}</p>}
      </section>
      {waitingForDiscount && <div role="status" className="mt-5 rounded-xl bg-yellow-50 p-4 leading-8">
        فایل انتخاب شد؛ درصد تخفیف نقدی را انتخاب کنید تا بروزرسانی خودکار شروع شود.
        <button type="button" onClick={cancel} className="block min-h-11 underline">لغو فایل انتخاب‌شده</button>
      </div>}
      {waitingForUnit && <section className="mt-5 rounded-xl border border-yellow-300 bg-yellow-50 p-4 leading-8">
        <p className="font-bold">جدول خوانده شد؛ واحد پول در فایل مشخص نیست.</p>
        <p className="text-sm">واحد مبلغ‌های همین فایل را انتخاب کنید تا ثبت قیمت‌ها ادامه پیدا کند.</p>
        <select defaultValue="" aria-label="واحد مبالغ فایل" onChange={(event) => chooseUnit(event.target.value)} className="mt-3 min-h-12 w-full rounded-xl border bg-white p-3">
          <option value="">واحد را انتخاب کنید</option><option value="rial">ریال</option><option value="toman">تومان</option>
        </select>
        <button type="button" onClick={cancel} className="mt-2 min-h-11 underline">لغو این فایل</button>
      </section>}
      {busy && <div role="status" className="mt-5 rounded-2xl border border-yellow-300 bg-yellow-50 p-5 leading-8">
        <p className="font-bold">{progress}</p>
        {busy === "reading" && <button type="button" onClick={cancel} className="mt-2 min-h-11 px-2 text-sm underline">توقف خواندن</button>}
      </div>}
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 leading-8 text-red-800">{error}</p>}
      {result && !busy && <section aria-label="نتیجه بروزرسانی خودکار" className="mt-5 space-y-4">
        <div role="status" className={`rounded-2xl border p-5 leading-9 ${result.updated.length > 0
          ? "border-green-200 bg-green-50 text-green-900" : "border-yellow-300 bg-yellow-50 text-yellow-900"}`}>
          <h2 className="text-lg font-bold">{result.updated.length > 0
            ? <><Check className="ml-2" />{result.updated.length.toLocaleString("fa-IR")} کالا بروزرسانی شد</>
            : <><TriangleAlert className="ml-2" />هیچ قیمت جدیدی ثبت نشد</>}</h2>
          {!result.updated.length && (result.skipped.length > 0 || result.conflicts.length > 0 || result.failed.length > 0)
            && <p className="text-sm">علت موارد بروزرسانی‌نشده در پایین آمده است.</p>}
          {result.suppliers.length > 0 && <p>شرکت: {result.suppliers.join("، ")}</p>}
          {result.unchanged.length > 0 && <p>{result.unchanged.length.toLocaleString("fa-IR")} کالا از قبل همین قیمت را داشت.</p>}
          {result.restored > 0 && <p>{result.restored.toLocaleString("fa-IR")} کالا به قیمت قبل از این فایل برگشت.</p>}
          <p className="text-sm">تخفیف نقدی این فایل: {result.cashDiscountPercent.toLocaleString("fa-IR")}٪ از مبلغ لیست؛ قیمت چکی برابر مبلغ لیست.</p>
          {result.updated.length > 0 && <button type="button" onClick={undo} className="mt-3 min-h-11 rounded-lg border border-green-400 bg-white px-3 text-sm">برگرداندن تغییرات این فایل</button>}
        </div>
        {result.updated.length > 0 && <details className="rounded-xl border border-gray-200 bg-white p-4">
          <summary className="min-h-11 cursor-pointer font-bold">قیمت‌های ثبت‌شده</summary>
          <ul className="divide-y divide-gray-200">{result.updated.map((item) => <li key={item.id} className="py-3 text-sm leading-8">
            <p className="font-bold">{item.label}</p><p>نقدی: {formatPrice(item.price)} · چکی: {formatPrice(item.priceCheck)}</p>
          </li>)}</ul>
        </details>}
        {(result.skipped.length > 0 || result.conflicts.length > 0 || result.failed.length > 0) && <details open className="rounded-xl border border-yellow-300 bg-yellow-50 p-4">
          <summary className="min-h-11 cursor-pointer font-bold">{(result.skipped.length + result.conflicts.length + result.failed.length).toLocaleString("fa-IR")} مورد بروزرسانی نشد</summary>
          <ul className="space-y-4 text-sm leading-7">
            {result.skipped.map((item, index) => <li key={`skip-${index}`}><p dir="auto">{item.source}</p><p className="text-gray-600">{item.reason}</p></li>)}
            {result.conflicts.map((item) => <li key={item.id}>{item.label} — قیمت هم‌زمان تغییر کرده است؛ برای بروزرسانی، فایل را دوباره انتخاب کنید.</li>)}
            {result.failed.map((item) => <li key={item.id}>{item.label} — ثبت انجام نشد؛ دوباره فایل را انتخاب کنید.</li>)}
          </ul>
        </details>}
      </section>}
      {pages.length > 0 && !busy && <details className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
        <summary className="min-h-11 cursor-pointer text-sm font-bold">مشاهده فایل ارسال‌شده</summary>
        {pages.map((page) => <img key={page.page} src={page.preview} alt={`صفحه ${page.page} لیست شرکت`} className="mt-4 w-full rounded-lg" />)}
      </details>}
    </main>
  );
}
