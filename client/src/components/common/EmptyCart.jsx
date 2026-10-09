import { useContext } from "react";
import { Link } from "react-router-dom";
import LanguageContext from "../../context/LanguageContext";

// «سبد خرید خالی است» + لینک محصولات؛ صفحه‌ی سبد و صفحه‌ی ثبت سفارش
function EmptyCart({ icon }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="bg-white rounded-3xl shadow-md p-10 text-center">
        {icon && <div className="text-5xl">{icon}</div>}

        <h2 className={`text-2xl font-bold ${icon ? "mt-4" : ""}`}>
          {t("cart.empty.title")}
        </h2>

        <Link
          to="/products"
          className="inline-block mt-6 bg-yellow-400 text-gray-950 px-8 py-3 rounded-xl font-bold"
        >
          {t("common.viewProducts")}
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
