import { useState } from "react";
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
    giftQtyCash: "",
    giftQtyCheck: "",
    note: "",
  },
};

function useProductForm(addProduct) {
  const [product, setProduct] = useState(initialState);

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
    const isNumericField = field === "buyQty" || field.startsWith("giftQty");

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

    const finalProduct = buildProductData(product);

    await addProduct(finalProduct);

    setProduct({
      ...initialState,
      image: null,
    });
  }

  return {
    product,
    updateField,
    updatePromotionField,
    submitProduct,
  };
}

export default useProductForm;
