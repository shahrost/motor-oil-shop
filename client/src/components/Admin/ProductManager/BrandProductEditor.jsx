import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductEditForm from "../../ProductEditForm";
import ProductList from "../ProductList";
import { adminBrandLabel, filterAdminProducts } from "./helpers/adminProductCatalog";

export default function BrandProductEditor({ brand, manager }) {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const { products, editingProduct, startEdit, saveEdit, cancelEdit, deleteProduct } = manager;
  const brandProducts = filterAdminProducts(products, brand, "");
  const visibleProducts = filterAdminProducts(brandProducts, brand, query);
  const editor = useRef(null);

  useEffect(() => {
    if (editingProduct) {
      editor.current?.focus({ preventScroll: true });
      editor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingProduct]);

  function search(value) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value) next.set("q", value);
      else next.delete("q");
      return next;
    }, { replace: true });
  }

  return (
    <section dir="rtl">
      <Link to="/admin#admin-products" className="mb-5 inline-flex min-h-11 items-center font-bold text-blue-700">→ بازگشت به برندها</Link>
      <h1 className="mb-2 text-2xl font-extrabold">محصولات {adminBrandLabel(brand)}</h1>
      <p className="mb-5 text-sm text-gray-600">محصول را پیدا کنید و برای تغییر قیمت یا اطلاعات، «ویرایش» را بزنید.</p>
      <label htmlFor="admin-product-search" className="mb-2 block font-bold">جست‌وجو در محصولات این برند</label>
      <div className="flex gap-2">
        <input id="admin-product-search" type="search" value={query} onChange={(event) => search(event.target.value)} placeholder="نام، کد کالا، گرید یا حجم…" className="min-h-12 min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3" />
        {query && <button type="button" onClick={() => search("")} className="rounded-xl border border-gray-300 px-4">پاک کردن</button>}
      </div>
      <p role="status" className="my-3 text-sm text-gray-600">نمایش {visibleProducts.length.toLocaleString("fa-IR")} از {brandProducts.length.toLocaleString("fa-IR")} محصول</p>
      {editingProduct && (
        <div ref={editor} tabIndex={-1} className="my-6 scroll-mt-4 rounded-2xl border border-blue-200 bg-white p-5">
          <p className="mb-4 font-bold">{editingProduct.name}</p>
          <ProductEditForm key={editingProduct.id} product={editingProduct} updateProduct={saveEdit} closeEdit={cancelEdit} />
        </div>
      )}
      <ProductList products={visibleProducts} startEdit={startEdit} deleteProduct={deleteProduct} emptyMessage={query ? "محصولی با این مشخصات پیدا نشد. عبارت جست‌وجو را تغییر دهید یا پاک کنید." : "هنوز محصولی برای این برند ثبت نشده است."} />
    </section>
  );
}
