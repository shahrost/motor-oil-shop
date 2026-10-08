import { API_ORIGIN } from "../../../../../api/config";
import usePriceUpdate from "../hooks/usePriceUpdate";
import SubmitStatus from "./SubmitStatus";
import ResultBox from "./ResultBox";
import ResultList from "./ResultList";

function PriceUpdateForm() {
  const { setFile, result, loading, error, submit } = usePriceUpdate();

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">بروزرسانی گروهی قیمت‌ها</h2>
      <p className="text-sm text-gray-500 mb-4">
        فقط یک فایل اکسل/CSV با دو ستون «کد محصول» و «قیمت (تومان)» کافی
        است — بدون نیاز به عکس یا سایر اطلاعات.
      </p>

      <a
        href={`${API_ORIGIN}/templates/price-update-template.xlsx`}
        download
        className="inline-block text-sm text-blue-600 underline mb-4"
      >
        دانلود فایل نمونه بروزرسانی قیمت
      </a>

      <label className="block text-sm font-bold mb-1">فایل قیمت‌ها</label>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full mb-4 text-sm"
      />

      <SubmitStatus
        loading={loading}
        label="اجرای بروزرسانی قیمت"
        loadingLabel="در حال بروزرسانی..."
        error={error}
      />

      {result && (
        <ResultBox title="نتیجه بروزرسانی">
          <p>تعداد محصولات بروزرسانی‌شده: {result.updated}</p>

          {result.notFound?.length > 0 && (
            <p className="text-amber-600 mt-1">
              کدهای پیدا نشده: {result.notFound.join("، ")}
            </p>
          )}

          <ResultList
            title="ردیف‌های ناموفق:"
            items={result.failed}
            renderItem={(f) => `ردیف ${f.row} ${f.sku ? `(${f.sku})` : ""}: ${f.error}`}
          />
        </ResultBox>
      )}
    </form>
  );
}

export default PriceUpdateForm;
