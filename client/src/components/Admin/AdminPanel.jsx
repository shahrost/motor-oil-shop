import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import ProductManager from "./ProductManager";
import ReviewManager from "./ReviewManager";
import { Link } from "react-router-dom";
import BrandSales from "./BrandSales";
import AdminScrollButtons from "./AdminScrollButtons";

function AdminPanel() {
  return (
    <main className="pb-32">
      <AdminHeader />

      <Link to="/admin/prices" className="mb-6 flex items-center justify-between gap-3 rounded-2xl bg-yellow-100 p-5 text-gray-950">
        <span><strong className="block text-lg">بروزرسانی خودکار قیمت‌ها با گوشی</strong><span className="mt-2 block text-sm">فقط عکس یا PDF لیست شرکت را انتخاب کنید</span></span>
        <span aria-hidden="true">←</span>
      </Link>

      <Dashboard />
      <BrandSales />

      <ProductManager />

      <ReviewManager />
      <AdminScrollButtons />
    </main>
  );
}

export default AdminPanel;
