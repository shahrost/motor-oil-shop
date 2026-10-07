import { useContext } from "react";

import { ProductContext } from "../../../../../context";
import {
  uploadProductImagesService,
  importProductsService,
} from "../../../../../services/productImportService";
import useExcelImport from "../hooks/useExcelImport";
import ImportFields from "./ImportFields";
import SubmitStatus from "./SubmitStatus";
import ProductImportResult from "./ProductImportResult";

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
        محصولات بر اساس «کد محصول» ساخته یا بروزرسانی می‌شوند. عکس اختیاری است؛
        محصول بدون عکس لوگوی برندش را نشان می‌دهد. ستون «خودروهای سازگار» (نام
        خودروها با کاما جدا) محصول را به تب فیلتر همان خودروها اضافه می‌کند.
      </p>

      <ImportFields
        templateFile="product-import-template.xlsx"
        templateLabel="دانلود فایل نمونه ایمپورت"
        imagesLabel="عکس‌های محصولات (چند فایل)"
        removeLabel="حذف محصولاتی که در این اکسل نیستند"
        importer={importer}
      />

      <label className="flex items-center gap-2 text-sm mb-4">
        <input
          type="checkbox"
          checked={importer.onlyNew}
          onChange={(e) => importer.setOnlyNew(e.target.checked)}
        />
        فقط محصولات جدید اضافه شوند (محصولات موجود ویرایش نشوند)
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={importer.preview}
          disabled={importer.loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          پیش‌نمایش (بدون ثبت)
        </button>

        <SubmitStatus
          loading={importer.loading}
          label="اجرای ایمپورت"
          loadingLabel="در حال ایمپورت..."
          progress={importer.progress}
          error={importer.error}
        />
      </div>

      {result && <ProductImportResult result={result} />}
    </form>
  );
}

export default ProductImportForm;
