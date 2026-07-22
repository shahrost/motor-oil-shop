import { useState } from "react";

function ProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    volume: "",
    viscosity: "",
    description: "",
    price: "",
    image: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    addProduct(product);

    setProduct({
      name: "",
      brand: "",
      category: "",
      volume: "",
      viscosity: "",
      description: "",
      price: "",
      image: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-2xl font-bold mb-5">افزودن محصول جدید</h2>

      <input
        name="name"
        placeholder="نام محصول"
        value={product.name}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="brand"
        placeholder="برند"
        value={product.brand}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="category"
        placeholder="دسته بندی"
        value={product.category}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="volume"
        placeholder="حجم"
        value={product.volume}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="viscosity"
        placeholder="ویسکوزیته مثلا 10W40"
        value={product.viscosity}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="price"
        placeholder="قیمت"
        value={product.price}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <textarea
        name="description"
        placeholder="توضیحات"
        value={product.description}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />

      <input
        name="image"
        placeholder="آدرس تصویر"
        value={product.image}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        ذخیره محصول
      </button>
      <div className="mt-5 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold">پیش نمایش اطلاعات:</h3>

        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
    </form>
  );
}

export default ProductForm;
