import { useState } from "react";
import ProductForm from "../components/ProductForm";

function Admin() {
  const [products, setProducts] = useState([]);

  function addProduct(newProduct) {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: Date.now(),
      },
    ]);
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">پنل مدیریت محصولات</h1>

      <ProductForm addProduct={addProduct} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold">محصولات جدید</h2>

        {products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 mt-3 rounded-lg">
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
