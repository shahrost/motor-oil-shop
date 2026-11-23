import { useContext, useState } from "react";
import { ProductContext } from "../../../../context";

function useProductManager() {
  const [editingProduct, setEditingProduct] = useState(null);
  const { products, addProduct, deleteProduct, updateProduct, loading, loadError, retryProducts } = useContext(ProductContext);

  return {
    products,
    loading,
    loadError,
    retryProducts,
    addProduct,
    deleteProduct,
    editingProduct,
    startEdit: setEditingProduct,
    // ProductEditForm closes only after this promise succeeds.
    saveEdit: updateProduct,
    cancelEdit: () => setEditingProduct(null),
  };
}

export default useProductManager;
