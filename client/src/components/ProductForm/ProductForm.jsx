import { useState } from "react";

function ProductForm({ addProduct }) {
  const brands = [
    "سمن شیمی",
    "پترولکس",
    "وم اویل",
    "بهتام",
    "توتال",
    "ادینول",
    "ایدلوب",
    "لوکینی",
    "ووفر",
    "فیلتر لوکومبیل",
    "فیلتر البرز",
    "فیلتر میهن",
    "فیلتر گیربکس ATFO",
    "بهران",
    "ایرانول",
    "پارس",
    "اسپیدی",
  ];

  const categories = [
    "روغن موتور بنزینی",
    "روغن موتور دیزلی",
    "روغن موتورسیکلت",
    "روغن گیربکس",
    "روغن صنعتی",
    "گریس",
    "مکمل سوخت",
    "محصولات دیگر",
  ];

  const volumes = [
    "300cc",
    "500cc",
    "1 لیتری",
    "2 لیتری",
    "3 لیتری",
    "4 لیتری",
    "5 لیتری",
    "100 گرمی",
    "120 گرمی",
    "1 پوندی",
    "2 پوندی",
    "3 پوندی",
    "5 پوندی",
    "7 کیلویی",
    "17 کیلویی",
    "180 کیلویی",
  ];

  const viscosities = [
    "SAE 40",
    "SAE 50",
    "20W50",
    "10W40",
    "10W50",
    "10W30",
    "5W30",
    "5W40",
    "0W20",
    "15W40",
    "25W50",
    "10W60",
  ];

  const apiList = [
    "SL",
    "SN",
    "SM",
    "SJ",
    "SC",
    "CH-4",
    "CI-4",
    "CJ-4",
    "CK-4",
  ];

  const aceaList = ["A1/B1", "A3/B4", "A5/B5", "C2", "C3", "C4", "E7", "E9"];

  const [product, setProduct] = useState({
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
  });

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

    const finalProduct = {
      ...product,

      name: `${product.brand} ${product.viscosity} ${product.volume}`,

      cartonCount: Number(product.cartonCount || 0),

      id: Date.now(),
    };

    addProduct(finalProduct);

    alert("محصول با موفقیت ثبت شد");

    setProduct({
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
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mt-8"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-5">افزودن محصول جدید</h2>

      <select
        name="brand"
        value={product.brand}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب برند</option>

        {brands.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب دسته بندی</option>

        {categories.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        name="volume"
        value={product.volume}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب حجم</option>

        {volumes.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        name="viscosity"
        value={product.viscosity}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب ویسکوزیته</option>

        {viscosities.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        name="api"
        value={product.api}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب API</option>

        {apiList.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <select
        name="acea"
        value={product.acea}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg mb-3"
      >
        <option value="">انتخاب ACEA</option>

        {aceaList.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <input
        name="oilType"
        placeholder="نوع روغن"
        value={product.oilType}
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

      <input
        name="cartonCount"
        placeholder="تعداد در کارتن مثلا 12"
        value={product.cartonCount}
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
        ثبت محصول
      </button>
    </form>
  );
}

export default ProductForm;
