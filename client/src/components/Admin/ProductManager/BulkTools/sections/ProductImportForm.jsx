import { useContext } from "react";

import { ProductContext } from "../../../../../context";
import {
  uploadProductImagesService,
  importProductsService,
} from "../../../../../services/productImportService";
import useExcelImport from "../hooks/useExcelImport";
import ImportFields from "./ImportFields";
import SubmitStatus from "./SubmitStatus";
import ResultBox from "./ResultBox";
import ResultList from "./ResultList";

function ProductImportForm() {
  const { reloadProducts } = useContext(ProductContext);

  const importer = useExcelImport({
    uploadImages: uploadProductImagesService,
    runImport: importProductsService,
    reload: reloadProducts,
    confirmRemoveMessage:
      "همه‌ی محصولاتی که در این فایل اکسل نیستند برای همیشه حذف می‌شوند. ادامه می‌دهید؟",
    errorLabel: "خطا در ایمپورت محصولات",
  });

  const { result } = importer;

  return (
    <form onSubmit={importer.submit} className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-2">ایمپورت گروهی محصولات</h2>
      <p className="text-sm text-gray-500 mb-4">
        یک فایل اکسل (طبق فرمت الگو) و پوشه عکس‌های محصولات را انتخاب کنید.
        محصولات بر اساس «کد محصول» ساخته یا بروزرسانی می‌شوند.
      </p>

      <ImportFields
        templateFile="product-import-template.xlsx"
        templateLabel="دانلود فایل نمونه ایمپورت"
        imagesLabel="عکس‌های محصولات (چند فایل)"
        removeLabel="حذف محصولاتی که در این اکسل نیستند"
        importer={importer}
      />

      <SubmitStatus
        loading={importer.loading}
        label="اجرای ایمپورت"
        loadingLabel="در حال ایمپورت..."
        progress={importer.progress}
        error={importer.error}
      />

      {result && (
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
            title="ردیف‌های ناموفق:"
            items={result.failed}
            renderItem={(f) => `ردیف ${f.row} (${f.sku}): ${f.error}`}
          />
        </ResultBox>
      )}
    </form>
  );
}

export default ProductImportForm;
