import { useContext } from "react";
import { Link } from "react-router-dom";

import ProductContext from "../context/ProductContext";

function Brands() {
  const { products } = useContext(ProductContext);

  const brands = [
    ...new Set(
      products
        .map((product) =>
          typeof product.brand === "object"
            ? product.brand.name
            : product.brand,
        )
        .filter(Boolean),
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <h1 className="text-4xl font-bold text-center">برندهای روغن موتور</h1>

      <p className="text-center mt-3 text-gray-600">انتخاب برند مورد نظر</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {brands.map((brand) => (
          <Link
            key={brand}
            to={`/brand/${brand}`}
            className="
            bg-white
            p-8
            rounded-xl
            shadow
            text-center
            text-2xl
            font-bold
            hover:bg-yellow-400
            transition
            "
          >
            {brand}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Brands;
