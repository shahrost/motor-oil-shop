import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function ViscosityProducts() {
  const { viscosity } = useParams();

  const { products } = useContext(ProductContext);

  const filteredProducts = products.filter(
    (product) => product.viscosity === viscosity,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/viscosity"
          className="inline-block mb-5 text-blue-600 font-bold"
        >
          ← بازگشت به گریدهای روغن
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            خرید روغن موتور {viscosity}
          </h1>

          <p className="text-center mt-4 text-gray-600">
            {filteredProducts.length} محصول با گرید {viscosity} موجود است
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-red-500 mt-10 font-bold">
              محصولی با این گرید پیدا نشد
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViscosityProducts;
