import { useRef, useState } from "react";
import buildProductData from "../helpers/buildProductData";

const initialState = {
  brand: "",
  category: "",
  volume: "",
  viscosity: "",
  api: "",
  acea: "",
  oilType: "",
  description: "",
  price: "",
  cartonCount: "",

  image: null,

  stock: 0,

  isBestSeller: false,
  isActive: true,

  promotion: {
    isActive: false,
    buyQty: "",
    buyQtyCash: "",
    buyQtyCheck: "",
    minQty: "",
    giftQtyCash: "",
    giftQtyCheck: "",
    note: "",
  },
};

function useProductForm(addProduct) {
  const [product, setProduct] = useState(initialState);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const pending = useRef(false);

  function updateField(name, value) {
    let newValue = value;

    if (name === "price" || name === "cartonCount") {
      newValue = value.replace(/\D/g, "");
    }

    setProduct((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function updatePromotionField(field, value) {
    const isNumericField =
      field.startsWith("buyQty") || field.startsWith("giftQty") || field === "minQty";

    const newValue = isNumericField
      ? String(value).replace(/\D/g, "")
      : value;

    setProduct((prev) => ({
      ...prev,
      promotion: { ...prev.promotion, [field]: newValue },
    }));
  }

  async function submitProduct(e) {
    e.preventDefault();

    if (pending.current) return;
    pending.current = true;
    setSaving(true);
    setError("");
    try {
      await addProduct(buildProductData(product));
      setProduct({ ...initialState, image: null });
    } catch (err) {
      setError(err.response?.data?.message || "ثبت محصول انجام نشد؛ اطلاعات فرم حفظ شده است.");
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }

  return {
    product,
    error,
    saving,
    updateField,
    updatePromotionField,
    submitProduct,
  };
}

export default useProductForm;
