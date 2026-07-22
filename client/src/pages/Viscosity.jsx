import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";

function Viscosity() {
  const { products } = useContext(ProductContext);

  const viscosities = [
    ...new Set(products.map((product) => product.viscosity)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center">دسته بندی روغن موتور</h1>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {viscosities.map((item) => (
          <Link
            key={item}
            to={`/viscosity/${item}`}
            className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition"
          >
            <h2 className="text-3xl font-bold">{item}</h2>

            <p className="mt-3 text-gray-600">مشاهده روغن های {item}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Viscosity;
