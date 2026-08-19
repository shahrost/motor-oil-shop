import ProductTable from "./ProductTable";

function ProductList({ products, startEdit, deleteProduct }) {
  if (!products.length) {
    return (
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">لیست محصولات</h2>

        <div
          className="
          bg-gray-100
          p-6
          rounded-lg
          text-center
          text-gray-500
          "
        >
          هنوز محصولی ثبت نشده است.
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">لیست محصولات</h2>

      <ProductTable
        products={products}
        startEdit={startEdit}
        deleteProduct={deleteProduct}
      />
    </section>
  );
}

export default ProductList;
