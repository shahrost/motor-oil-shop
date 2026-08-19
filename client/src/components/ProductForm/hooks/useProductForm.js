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
    submitProduct,
  };
}

export default useProductForm;
