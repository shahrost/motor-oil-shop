import ProductForm from "../../ProductForm";
import ProductEditForm from "../../ProductEditForm";
import ProductList from "../ProductList";

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
