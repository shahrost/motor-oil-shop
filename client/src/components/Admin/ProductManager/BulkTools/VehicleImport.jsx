import { useContext, useState } from "react";
import { VehicleContext } from "../../../../context";
import { importVehiclesService } from "../../../../services/vehicleService";

const SERVER_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api\/?$/, "");

function VehicleImport() {
  const { reloadVehicles } = useContext(VehicleContext);

  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [removeMissing, setRemoveMissing] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setError("فایل اکسل را انتخاب کنید");
      return;
    }

    if (
      removeMissing &&
      !window.confirm(
        "همه‌ی خودروهایی که در این فایل اکسل نیستند برای همیشه حذف می‌شوند. ادامه می‌دهید؟",
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await importVehiclesService(file, images, removeMissing);
      setResult(response.data);
      await reloadVehicles();
    } catch (err) {
      setError(err.response?.data?.message || "خطا در ایمپورت خودروها");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg md:col-span-2"
    >
      <h2 className="text-xl font-bold mb-2">ایمپورت گروهی خودروها</h2>
      <p className="text-sm text-gray-500 mb-4">
        یک فایل اکسل (طبق فرمت الگو) و عکس‌های خودروها را انتخاب کنید. خودروها
        بر اساس «کد خودرو» ساخته یا بروزرسانی می‌شوند و اسم فایل هر عکس باید
        در ستون «نام فایل عکس» نوشته شود. تا وقتی اولین ایمپورت انجام نشده،
        سایت لیست پیش‌فرض خودروها را نشان می‌دهد. فایل چندشیتی «لیست خودروها +
        ارتباط محصولات» هم پشتیبانی می‌شود و روغن‌های هر خودرو از شیت ارتباط
        محصولات خوانده می‌شود.
      </p>

      <a
        href={`${SERVER_ORIGIN}/templates/vehicle-import-template.xlsx`}
        download
        className="inline-block text-sm text-blue-600 underline mb-4"
      >
        دانلود فایل نمونه ایمپورت خودرو
      </a>

      <label className="block text-sm font-medium mb-1">فایل اکسل</label>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full mb-4 text-sm"
      />

      <label className="block text-sm font-medium mb-1">
        عکس‌های خودروها (چند فایل)
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
        className="block w-full mb-4 text-sm"
      />

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          checked={removeMissing}
          onChange={(e) => setRemoveMissing(e.target.checked)}
        />
        حذف خودروهایی که در این اکسل نیستند
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "در حال ایمپورت..." : "اجرای ایمپورت خودرو"}
      </button>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

      {result && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
          <p className="font-bold mb-2">نتیجه ایمپورت خودرو</p>
          <p>خودروی جدید ایجاد شد: {result.created}</p>
          <p>خودروی موجود بروزرسانی شد: {result.updated}</p>

          {result.linksCount > 0 && (
            <p>تعداد ارتباط خودرو ↔ روغن ثبت شد: {result.linksCount}</p>
          )}

          {result.missingProducts?.length > 0 && (
            <div className="mt-2">
              <p className="text-amber-600">
                این کد محصول‌ها در سایت وجود ندارند و برای خودروها نمایش داده
                نمی‌شوند ({result.missingProducts.length}):
              </p>
              <p>{result.missingProducts.join("، ")}</p>
            </div>
          )}

          {result.removed?.length > 0 && (
            <div className="mt-2">
              <p className="text-amber-600">
                خودروهای حذف‌شده (در اکسل نبودند): {result.removed.length}
              </p>
              <ul className="list-disc pr-5">
                {result.removed.map((r) => (
                  <li key={r.sku}>
                    {r.sku}: {r.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.failed?.length > 0 && (
            <div className="mt-2">
              <p className="text-red-600">ردیف‌های ناموفق:</p>
              <ul className="list-disc pr-5">
                {result.failed.map((f) => (
                  <li key={f.row}>
                    ردیف {f.row} ({f.sku}): {f.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default VehicleImport;
