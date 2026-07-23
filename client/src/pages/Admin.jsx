import { useContext, useState } from "react";
import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm/ProductForm";
import OrderList from "../components/OrderList";
function Admin() {
  const { products, addProduct, deleteProduct, updateProduct } =
    useContext(ProductContext);

  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({});

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
    "فیلتر گیربکس ATF",
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
    "مکمل سوخت",
    "محصولات دیگر",
  ];

  const volumes = [
    "300cc",
    "500cc",
    "1 لیتری",
    "4 لیتری",
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

  const apis = [
    "SL",
    "SN",
    "SM",
    "SJ",
    "SC",
    "CH4",
    "CI4",
    "CK4",
    "CF",
    "GL4",
    "GL5",
  ];

  function startEdit(product) {
    setEditingProduct(product);

    setEditForm({
      ...product,
    });
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "price") {
      newValue = value.replace(/\D/g, "");
    }

    const updated = {
      ...editForm,

      [name]: newValue,
    };

    updated.name = `${updated.brand || ""} ${updated.viscosity || ""} ${updated.volume || ""}`;

    setEditForm(updated);
  }

  function saveEdit() {
    updateProduct(editingProduct.id, editForm);

    setEditingProduct(null);

    setEditForm({});
  }

  return (
    <div className="p-6 md:p-10" dir="rtl">
      <h1 className="text-4xl font-bold">پنل مدیریت محصولات</h1>

      <ProductForm addProduct={addProduct} />

      {editingProduct && (
        <div className="bg-white p-6 rounded-xl shadow mt-8">
          <h2 className="text-2xl font-bold mb-5">ویرایش محصول</h2>

          <select
            name="brand"
            value={editForm.brand}
            onChange={handleEditChange}
            className="border p-3 w-full rounded mb-3"
          >
            <option value="">انتخاب برند</option>

            {brands.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            className="border p-3 w-full rounded mb-3"
          >
            <option value="">انتخاب دسته بندی</option>

            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="volume"
            value={editForm.volume}
            onChange={handleEditChange}
            className="border p-3 w-full rounded mb-3"
          >
            <option value="">انتخاب حجم</option>

            {volumes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="viscosity"
            value={editForm.viscosity}
            onChange={handleEditChange}
            className="border p-3 w-full rounded mb-3"
          >
            <option value="">انتخاب ویسکوزیته</option>

            {viscosities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            name="api"
            value={editForm.api || ""}
            onChange={handleEditChange}
            className="border p-3 w-full rounded mb-3"
          >
            <option value="">انتخاب API</option>

            {apis.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <input
            name="price"
            value={editForm.price || ""}
            onChange={handleEditChange}
            placeholder="قیمت"
            className="border p-3 w-full rounded mb-3"
          />

          <input
            name="image"
            value={editForm.image || ""}
            onChange={handleEditChange}
            placeholder="آدرس تصویر"
            className="border p-3 w-full rounded mb-3"
          />

          <textarea
            name="description"
            value={editForm.description || ""}
            onChange={handleEditChange}
            placeholder="توضیحات"
            className="border p-3 w-full rounded mb-3"
          />

          <button
            onClick={saveEdit}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            ذخیره تغییرات
          </button>

          <button
            onClick={() => setEditingProduct(null)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg mr-3"
          >
            انصراف
          </button>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold">لیست محصولات</h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 mt-3 rounded-lg flex justify-between"
          >
            <span>{product.name}</span>

            <div>
              <button
                onClick={() => startEdit(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                ویرایش
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      <OrderList />
    </div>
  );
}

export default Admin;
