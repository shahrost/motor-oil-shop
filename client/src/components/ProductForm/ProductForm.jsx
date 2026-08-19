import {
  BasicInfo,
  Description,
  ProductStatus,
  TechnicalInfo,
  ImageSection,
} from "./sections";

import useProductForm from "./hooks/useProductForm";

function ProductForm({ addProduct }) {
  const { product, updateField, submitProduct } = useProductForm(addProduct);

  return (
    <form
      onSubmit={submitProduct}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-5">افزودن محصول جدید</h2>

      <BasicInfo product={product} updateField={updateField} />

      <TechnicalInfo product={product} updateField={updateField} />

      <Description product={product} updateField={updateField} />

      <ProductStatus product={product} updateField={updateField} />

      <ImageSection product={product} updateField={updateField} />

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-5"
      >
        ثبت محصول
      </button>
    </form>
  );
}

export default ProductForm;
