import { useState } from "react";

import ProductFields from "../ProductFields/ProductFields";

import createProduct from "../../models/createProduct";

function ProductForm({ addProduct }) {
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
    image: "",
  };

  const [product, setProduct] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "price" || name === "cartonCount") {
      newValue = value.replace(/\D/g, "");
    }

    setProduct({
      ...product,

      [name]: newValue,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const finalProduct = createProduct({
      ...product,

      name: `${product.brand} ${product.viscosity} ${product.volume}`,
    });

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

      <ProductFields product={product} handleChange={handleChange} />

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
