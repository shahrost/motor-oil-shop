import { ProductImportForm, PriceUpdateForm, VehicleImportForm } from "./sections";

// ابزارهای گروهی پنل ادمین: ایمپورت محصولات، بروزرسانی قیمت‌ها، ایمپورت خودروها
function BulkTools() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8" dir="rtl">
      <ProductImportForm />

      <PriceUpdateForm />

      <VehicleImportForm />
    </div>
  );
}

export default BulkTools;
