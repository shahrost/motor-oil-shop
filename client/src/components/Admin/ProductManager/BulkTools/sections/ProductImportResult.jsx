import ResultBox from "./ResultBox";
import ResultList from "./ResultList";

const GROUP_ROWS_SHOWN = 10;

// یک گروه خطای هم‌نوع: «N ردیف: متن خطا» + چند ردیف نمونه
function FailureGroup({ group }) {
  const shown = group.rows.slice(0, GROUP_ROWS_SHOWN);

  return (
    <div>
      <p>
        {group.count} ردیف: {group.error}
      </p>

      {group.hint && <p className="text-gray-500">{group.hint}</p>}

      <details className="text-gray-600">
        <summary className="cursor-pointer">نمایش ردیف‌ها</summary>

        <ul className="list-disc pr-5">
          {shown.map((r) => (
            <li key={r.row}>
              ردیف {r.row} ({r.sku}){r.detail ? `: ${r.detail}` : ""}
            </li>
          ))}
        </ul>

        {group.count > shown.length && <p>و {group.count - shown.length} ردیف دیگر...</p>}
      </details>
    </div>
  );
}

// گزارش ایمپورت محصولات: ساخته/بروزشده، رد شده‌ها، تکراری‌ها و اتصال به خودروها.
// در حالت پیش‌نمایش (dryRun) هیچ‌چیز ثبت یا حذف نشده و اعداد یعنی «می‌شود».
function ProductImportResult({ result }) {
  const dry = result.dryRun;

  return (
    <ResultBox title={dry ? "پیش‌نمایش ایمپورت (چیزی ثبت یا حذف نشد)" : "نتیجه ایمپورت"}>
      {result.aborted && <p className="text-red-600 font-bold">{result.aborted}</p>}

      {result.removalSkipped && <p className="text-amber-600">{result.removalSkipped}</p>}

      <p>تعداد ردیف‌های فایل: {result.totalRows}</p>
      <p>
        {dry ? "محصول جدید ساخته می‌شود" : "محصول جدید ایجاد شد"}: {result.created}
      </p>
      <p>
        {dry ? "محصول موجود بروزرسانی می‌شود" : "محصول موجود بروزرسانی شد"}: {result.updated}
      </p>
      <p>ردیف‌های دارای خطا: {result.failed?.length}</p>

      <ResultList
        title={`${dry ? "محصولاتی که حذف می‌شوند" : "محصولات حذف‌شده"} (در اکسل نبودند): ${result.removed?.length}`}
        tone="text-amber-600"
        items={result.removed}
        renderItem={(r) => `${r.sku}: ${r.name}`}
      />

      <ResultList
        title={`از قبل وجود داشتند و ${dry ? "دست نمی‌خورند" : "دست نخوردند"}: ${result.skipped?.length}`}
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
        title={`فایل عکس پیدا نشد (محصول بدون عکس ثبت می‌شود): ${result.missingImages?.length}`}
        tone="text-amber-600"
        items={result.missingImages}
        renderItem={(r) => `ردیف ${r.row} (${r.sku}): «${r.name}»`}
      />

      <ResultList
        title="ردیف‌های ناموفق (گروه‌بندی‌شده):"
        items={result.failureGroups}
        renderItem={(group) => <FailureGroup group={group} />}
      />
    </ResultBox>
  );
}

export default ProductImportResult;
