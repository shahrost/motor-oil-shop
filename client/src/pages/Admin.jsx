import { useContext, useState } from "react";
import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm";

function Admin() {
  const { products, addProduct, deleteProduct, updateProduct } =
    useContext(ProductContext);

  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({});

  function handleEditChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  function startEdit(product) {
    setEditingProduct(product);

    setEditForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      volume: product.volume || "",
      viscosity: product.viscosity || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || "",
    });
  }

  function saveEdit() {
    updateProduct(editingProduct.id, editForm);

    setEditingProduct(null);
    setEditForm({});
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-4xl font-bold">پنل مدیریت محصولات</h1>

      <ProductForm addProduct={addProduct} />

      {/* Edit Form */}
      {editingProduct && (
        <div className="bg-white p-5 rounded-lg shadow mt-8">
          <h2 className="text-2xl font-bold mb-5">ویرایش محصول</h2>

          <input
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            placeholder="نام محصول"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <input
            name="brand"
            value={editForm.brand}
            onChange={handleEditChange}
            placeholder="برند"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <input
            name="category"
            value={editForm.category}
            onChange={handleEditChange}
            placeholder="دسته بندی"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <input
            name="volume"
            value={editForm.volume}
            onChange={handleEditChange}
            placeholder="حجم"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <input
            name="viscosity"
            value={editForm.viscosity}
            onChange={handleEditChange}
            placeholder="گرید روغن"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <input
            name="price"
            value={editForm.price}
            onChange={handleEditChange}
            placeholder="قیمت"
            className="border p-3 rounded-lg w-full mb-3"
          />
          <input
            name="image"
            value={editForm.image || ""}
            onChange={handleEditChange}
            placeholder="آدرس تصویر محصول"
            className="border p-3 rounded-lg w-full mb-3"
          />
          {editForm.image && (
            <img
              src={editForm.image}
              alt="preview"
              className="w-40 h-40 object-contain mx-auto mb-4"
            />
          )}

          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            placeholder="توضیحات"
            className="border p-3 rounded-lg w-full mb-3"
          />

          <div className="flex gap-3">
            <button
              onClick={saveEdit}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              ذخیره تغییرات
            </button>

            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">محصولات جدید</h2>

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 mt-3 rounded-lg flex justify-between items-center"
          >
            <span className="font-bold">{product.name}</span>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                ویرایش
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
