import { useContext } from "react";

import { VehicleContext } from "../../../../../context";
import {
  importVehiclesService,
  uploadVehicleImagesService,
} from "../../../../../services/vehicleService";
import useExcelImport from "../hooks/useExcelImport";
import ImportFields from "./ImportFields";
import SubmitStatus from "./SubmitStatus";
import ResultBox from "./ResultBox";
import ResultList from "./ResultList";

function VehicleImportForm() {
  const { reloadVehicles } = useContext(VehicleContext);

  const importer = useExcelImport({
    uploadImages: uploadVehicleImagesService,
    runImport: importVehiclesService,
    reload: reloadVehicles,
    confirmRemoveMessage:
      "همه‌ی خودروهایی که در این فایل اکسل نیستند برای همیشه حذف می‌شوند. ادامه می‌دهید؟",
    errorLabel: "خطا در ایمپورت خودروها",
  });

  const { result } = importer;

  return (
    <form
      onSubmit={importer.submit}
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

      <ImportFields
        templateFile="vehicle-import-template.xlsx"
        templateLabel="دانلود فایل نمونه ایمپورت خودرو"
        imagesLabel="عکس‌های خودروها (چند فایل)"
        removeLabel="حذف خودروهایی که در این اکسل نیستند"
        importer={importer}
      />

      <SubmitStatus
        loading={importer.loading}
        label="اجرای ایمپورت خودرو"
        loadingLabel="در حال ایمپورت..."
        progress={importer.progress}
        error={importer.error}
      />

      {result && (
        <ResultBox title="نتیجه ایمپورت خودرو">
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

          <ResultList
            title={`خودروهای حذف‌شده (در اکسل نبودند): ${result.removed?.length}`}
            tone="text-amber-600"
            items={result.removed}
            renderItem={(r) => `${r.sku}: ${r.name}`}
          />

          <ResultList
            title="ردیف‌های ناموفق:"
            items={result.failed}
            renderItem={(f) => `ردیف ${f.row} (${f.sku}): ${f.error}`}
          />
        </ResultBox>
      )}
    </form>
  );
}

export default VehicleImportForm;
