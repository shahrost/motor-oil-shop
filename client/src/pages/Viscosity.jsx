import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../context/ProductContext";

function Viscosity() {
  const { products } = useContext(ProductContext);

  const viscosities = [
    ...new Set(products.map((product) => product.viscosity)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <h1 className="text-4xl font-bold text-center">دسته بندی روغن موتور</h1>

      <p className="text-center mt-3 text-gray-600">انتخاب گرید مناسب روغن</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {viscosities.map((item) => {
          const count = products.filter(
            (product) => product.viscosity === item,
          ).length;

          return (
            <Link
              key={item}
              to={`/viscosity/${item}`}
              className="bg-white shadow-lg rounded-xl p-8 text-center hover:bg-yellow-400 transition"
            >
              <h2 className="text-3xl font-bold">{item}</h2>

              <p className="mt-3 text-gray-600">{count} محصول موجود است</p>

              <p className="mt-3 font-bold">مشاهده روغن‌های {item}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Viscosity;
