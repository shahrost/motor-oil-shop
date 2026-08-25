import ProductForm from "../../ProductForm";
import ProductEditForm from "../../ProductEditForm";
import ProductList from "../ProductList";
import BulkTools from "./BulkTools/BulkTools";

import useProductManager from "./hooks/useProductManager";

function ProductManager() {
  const {
    products,
    addProduct,
    deleteProduct,

    editingProduct,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useProductManager();

  return (
    <section>
      <BulkTools />

      <ProductForm addProduct={addProduct} />

      {editingProduct && (
        <ProductEditForm
          product={editingProduct}
          updateProduct={saveEdit}
          closeEdit={cancelEdit}
        />
      )}

      <ProductList
        products={products}
        startEdit={startEdit}
        deleteProduct={deleteProduct}
      />
    </section>
  );
}

export default ProductManager;
