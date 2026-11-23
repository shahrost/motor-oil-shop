import { Link } from "react-router-dom";
import brands from "../../../data/brands";
import { adminBrandPath, buildAdminBrands } from "./helpers/adminProductCatalog";

export default function ProductBrandPicker({ products }) {
  return (
    <section id="admin-products" className="my-6 rounded-2xl border border-gray-200 bg-white p-5" dir="rtl">
      <h2 className="text-2xl font-bold">ویرایش محصولات بر اساس برند</h2>
      <p className="mb-5 mt-2 text-sm leading-7 text-gray-600">برای تغییر دستی قیمت یا اطلاعات محصول، برند آن را انتخاب کنید.</p>
      <div className="flex flex-col gap-3">
        {buildAdminBrands(products, brands).map(({ key, label, count }) => (
          <Link key={key} to={adminBrandPath(key)} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-bold hover:border-blue-600 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">
            <span>{label}</span>
            <span className="flex shrink-0 items-center gap-3 text-sm font-normal text-gray-600">
              {count.toLocaleString("fa-IR")} محصول <span aria-hidden="true">←</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
