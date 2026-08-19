import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../../../context";
function useProductManager() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const { products, addProduct, deleteProduct, updateProduct } =
    useContext(ProductContext);

  function startEdit(product) {
    setEditingProduct(product);

    setEditForm({
      ...product,
    });
  }

  function saveEdit(id, updatedProduct) {
    updateProduct(id, updatedProduct);

    setEditingProduct(null);
    setEditForm({});
  }

  function cancelEdit() {
    setEditingProduct(null);
    setEditForm({});
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "price") {
      newValue = value.replace(/\D/g, "");
    }

    const updated = {
      ...editForm,
      [name]: newValue,
    };

    updated.name = `${updated.brand || ""} ${
      updated.viscosity || ""
    } ${updated.volume || ""}`;

    setEditForm(updated);
  }

  return {
    editingProduct,
    editForm,
    startEdit,
    handleEditChange,
    cancelEdit,
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    saveEdit,
  };
}

export default useProductManager;
