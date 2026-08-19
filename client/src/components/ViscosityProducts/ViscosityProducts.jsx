import { Link } from "react-router-dom";

import useViscosityProducts from "./hooks/useViscosityProducts";
import ViscosityProductsList from "./sections/ViscosityProductsList";

function ViscosityProducts() {
  const { viscosity, filteredProducts } = useViscosityProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/viscosity"
        className="inline-block mb-6 font-bold text-green-700 hover:text-green-900"
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

        <ViscosityProductsList products={filteredProducts} />
      </div>
    </div>
  );
}

export default ViscosityProducts;
