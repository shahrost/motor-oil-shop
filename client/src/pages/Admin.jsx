import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../context/ProductContext";
import ProductForm from "../components/ProductForm/ProductForm";
import OrderList from "../components/OrderList";
import ProductEditForm from "../components/ProductEditForm/ProductEditForm";

function Admin() {
  const { products, addProduct, deleteProduct, updateProduct } =
    useContext(ProductContext);

  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">پنل مدیریت محصولات</h1>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          خروج از پنل
        </button>
      </div>
      <ProductForm addProduct={addProduct} />

      {editingProduct && (
        <ProductEditForm
          editForm={editForm}
          handleEditChange={handleEditChange}
          saveEdit={saveEdit}
          cancelEdit={() => setEditingProduct(null)}
        />
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
