import { useRef, useState } from "react";
import buildEditProductData from "../helpers/buildEditProductData";

function useProductEdit(product, updateProduct, closeEdit) {
  const [editForm, setEditForm] = useState(product);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const pending = useRef(false);

  function handleEditChange(e) {
    const { name, value, type, checked } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handlePromotionChange(field, value) {
    setEditForm((prev) => ({
      ...prev,
      promotion: { ...prev.promotion, [field]: value },
    }));
  }

  async function saveEdit() {
    if (pending.current) return;
    pending.current = true;
    setSaving(true);
    setError("");
    try {
      await updateProduct(product.id, buildEditProductData(editForm));
      closeEdit();
    } catch (err) {
      setError(err.response?.data?.message || "ویرایش محصول انجام نشد؛ اطلاعات فرم حفظ شده است.");
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }

  function cancelEdit() {
    closeEdit();
  }

  return {
    editForm,
    error,
    saving,
    handleEditChange,
    handlePromotionChange,
    saveEdit,
    cancelEdit,
  };
}

export default useProductEdit;
