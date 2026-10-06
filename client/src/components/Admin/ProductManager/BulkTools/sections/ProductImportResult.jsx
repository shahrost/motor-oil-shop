import ResultBox from "./ResultBox";
import ResultList from "./ResultList";

// گزارش ایمپورت محصولات: ساخته/بروزشده، رد شده‌ها، تکراری‌ها و اتصال به خودروها
function ProductImportResult({ result }) {
  return (
    <ResultBox title="نتیجه ایمپورت">
      <p>محصول جدید ایجاد شد: {result.created}</p>
      <p>محصول موجود بروزرسانی شد: {result.updated}</p>

      <ResultList
        title={`محصولات حذف‌شده (در اکسل نبودند): ${result.removed?.length}`}
        tone="text-amber-600"
        items={result.removed}
        renderItem={(r) => `${r.sku}: ${r.name}`}
      />

      <ResultList
        title={`از قبل وجود داشتند و دست نخوردند: ${result.skipped?.length}`}
        tone="text-amber-600"
        items={result.skipped}
        renderItem={(r) => `ردیف ${r.row} (${r.sku}): ${r.name}`}
      />

      <ResultList
        title={`ردیف‌های تکراری در فایل (فقط اولی ثبت شد): ${result.duplicates?.length}`}
        tone="text-amber-600"
        items={result.duplicates}
        renderItem={(r) => `ردیف ${r.row} (${r.sku}): ${r.name}`}
      />

      <ResultList
        title={`اتصال به خودروها: ${result.vehicleLinks?.length} محصول`}
        tone="text-green-700"
        items={result.vehicleLinks}
        renderItem={(r) => `${r.sku}: ${r.vehicles} خودرو`}
      />

      <ResultList
        title={`خودروهایی که در سایت پیدا نشدند: ${result.unmatchedVehicles?.length}`}
        items={result.unmatchedVehicles}
        renderItem={(r) => `ردیف ${r.row} (${r.sku}): «${r.vehicle}»`}
      />

      <ResultList
        title={`بدون خودروی سازگار (به خودرویی وصل نشدند): ${result.noVehicles?.length}`}
        tone="text-amber-600"
        items={result.noVehicles}
        renderItem={(r) => `ردیف ${r.row} (${r.sku}): ${r.name}`}
      />

      <ResultList
        title="ردیف‌های ناموفق:"
        items={result.failed}
        renderItem={(f) => `ردیف ${f.row} (${f.sku}): ${f.error}`}
      />
    </ResultBox>
  );
}

export default ProductImportResult;
