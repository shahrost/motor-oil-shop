import { useState } from "react";
import buildEditProductData from "../helpers/buildEditProductData";

function useProductEdit(product, updateProduct, closeEdit) {
  const [editForm, setEditForm] = useState(product);

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePromotionChange(field, value) {
    setEditForm((prev) => ({
      ...prev,
      promotion: { ...prev.promotion, [field]: value },
    }));
  }

  async function saveEdit() {
    const finalProduct = buildEditProductData(editForm);

    await updateProduct(product.id, finalProduct);

    closeEdit();
  }

  function cancelEdit() {
    closeEdit();
  }

  return {
    editForm,
    handleEditChange,
    handlePromotionChange,
    saveEdit,
    cancelEdit,
  };
}

export default useProductEdit;
