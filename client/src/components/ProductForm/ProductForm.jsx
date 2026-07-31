import { useState } from "react";
import ImageSelector from "./ImageSelector";
import ProductFields from "../ProductFields/ProductFields";
import ImageUploader from "./ImageUploader";

import createProduct from "../../models/createProduct";

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
  image: {
    main: "",
    gallery: [],
  },
};

function ProductForm({ addProduct }) {
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

  function handleSubmit(e) {
    e.preventDefault();

    const finalProduct = createProduct(product);

    addProduct(finalProduct);

    alert("محصول با موفقیت ثبت شد");

    setProduct(initialState);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-5">افزودن محصول جدید</h2>
      <ProductFields product={product} updateField={updateField} />
      <ImageSelector product={product} updateField={updateField} />{" "}
      <ImageUploader product={product} updateField={updateField} />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        ثبت محصول
      </button>
    </form>
  );
}

export default ProductForm;
