import ProductForm from "../../ProductForm";
import ProductBrandPicker from "./ProductBrandPicker";
import BrandProductEditor from "./BrandProductEditor";
import BulkTools from "./BulkTools";

import useProductManager from "./hooks/useProductManager";

function ProductManager({ brand }) {
  const manager = useProductManager();
  const { products, addProduct, loading, loadError, retryProducts } = manager;

  if (loading) return <p role="status" className="p-5" dir="rtl">در حال دریافت محصولات…</p>;
  if (loadError) return <div role="alert" className="p-5 text-red-700" dir="rtl">دریافت محصولات انجام نشد.<button type="button" onClick={retryProducts} className="m-3 underline">تلاش دوباره</button></div>;
  if (brand !== undefined) return <BrandProductEditor key={brand} brand={brand} manager={manager} />;

  return (
    <section>
      <ProductBrandPicker products={products} />
      <BulkTools />

      <ProductForm addProduct={addProduct} />
    </section>
  );
}

export default ProductManager;
