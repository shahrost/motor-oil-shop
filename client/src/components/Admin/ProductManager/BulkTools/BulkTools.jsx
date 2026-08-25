import useBulkTools from "./hooks/useBulkTools";

const SERVER_ORIGIN = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/api\/?$/, "");

function ResultBox({ title, children }) {
  return (
    <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
      <p className="font-bold mb-2">{title}</p>
      {children}
    </div>
  );
}

function BulkTools() {
  const {
    setImportFile,
    setImportImages,
    importResult,
    importLoading,
    importError,
    submitImport,

    setPriceFile,
    priceResult,
    priceLoading,
    priceError,
    submitPriceUpdate,
  } = useBulkTools();

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8" dir="rtl">
      <form
        onSubmit={submitImport}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2">ایمپورت گروهی محصولات</h2>
        <p className="text-sm text-gray-500 mb-4">
          یک فایل اکسل (طبق فرمت الگو) و پوشه عکس‌های محصولات را انتخاب کنید.
          محصولات بر اساس «کد محصول» ساخته یا بروزرسانی می‌شوند.
        </p>

        <a
          href={`${SERVER_ORIGIN}/templates/product-import-template.xlsx`}
          download
          className="inline-block text-sm text-blue-600 underline mb-4"
        >
          دانلود فایل نمونه ایمپورت
        </a>

        <label className="block text-sm font-medium mb-1">فایل اکسل</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => setImportFile(e.target.files[0])}
          className="block w-full mb-4 text-sm"
        />

        <label className="block text-sm font-medium mb-1">
          عکس‌های محصولات (چند فایل)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImportImages(Array.from(e.target.files))}
          className="block w-full mb-4 text-sm"
        />

        <button
          type="submit"
          disabled={importLoading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {importLoading ? "در حال ایمپورت..." : "اجرای ایمپورت"}
        </button>

        {importError && (
          <p className="text-red-600 text-sm mt-3">{importError}</p>
        )}

        {importResult && (
          <ResultBox title="نتیجه ایمپورت">
            <p>محصول جدید ایجاد شد: {importResult.created}</p>
            <p>محصول موجود بروزرسانی شد: {importResult.updated}</p>
            {importResult.failed?.length > 0 && (
              <div className="mt-2">
                <p className="text-red-600">ردیف‌های ناموفق:</p>
                <ul className="list-disc pr-5">
                  {importResult.failed.map((f) => (
                    <li key={f.row}>
                      ردیف {f.row} ({f.sku}): {f.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ResultBox>
        )}
      </form>

      <form
        onSubmit={submitPriceUpdate}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold mb-2">بروزرسانی گروهی قیمت‌ها</h2>
        <p className="text-sm text-gray-500 mb-4">
          فقط یک فایل اکسل/CSV با دو ستون «کد محصول» و «قیمت (تومان)» کافی
          است — بدون نیاز به عکس یا سایر اطلاعات.
        </p>

        <a
          href={`${SERVER_ORIGIN}/templates/price-update-template.xlsx`}
          download
          className="inline-block text-sm text-blue-600 underline mb-4"
        >
          دانلود فایل نمونه بروزرسانی قیمت
        </a>

        <label className="block text-sm font-medium mb-1">فایل قیمت‌ها</label>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e) => setPriceFile(e.target.files[0])}
          className="block w-full mb-4 text-sm"
        />

        <button
          type="submit"
          disabled={priceLoading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {priceLoading ? "در حال بروزرسانی..." : "اجرای بروزرسانی قیمت"}
        </button>

        {priceError && (
          <p className="text-red-600 text-sm mt-3">{priceError}</p>
        )}

        {priceResult && (
          <ResultBox title="نتیجه بروزرسانی">
            <p>تعداد محصولات بروزرسانی‌شده: {priceResult.updated}</p>
            {priceResult.notFound?.length > 0 && (
              <p className="text-amber-600 mt-1">
                کدهای پیدا نشده: {priceResult.notFound.join("، ")}
              </p>
            )}
            {priceResult.failed?.length > 0 && (
              <div className="mt-2">
                <p className="text-red-600">ردیف‌های ناموفق:</p>
                <ul className="list-disc pr-5">
                  {priceResult.failed.map((f) => (
                    <li key={f.row}>
                      ردیف {f.row} {f.sku ? `(${f.sku})` : ""}: {f.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ResultBox>
        )}
      </form>
    </div>
  );
}

export default BulkTools;
