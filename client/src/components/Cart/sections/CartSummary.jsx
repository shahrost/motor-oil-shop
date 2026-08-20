import { useContext } from "react";
import { Link } from "react-router-dom";
import formatPrice from "../../../utils/formatPrice";
import LanguageContext from "../../../context/LanguageContext";

function CartSummary({ cartTotal, clearCart }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-3xl shadow p-6 mt-8">
      <h2 className="text-3xl font-extrabold text-green-700">
        {t("cart.summary.total")} {formatPrice(cartTotal, language)}
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          to="/products"
          className="bg-gray-800 text-white text-center py-4 rounded-xl font-bold"
        >
          {t("common.continueShopping")}
        </Link>

        <button
          onClick={clearCart}
          className="bg-red-600 text-white rounded-xl font-bold"
        >
          {t("cart.summary.clear")}
        </button>

        <Link
          to="/order"
          className="bg-green-600 text-white text-center py-4 rounded-xl font-bold"
        >
          {t("cart.summary.checkout")}
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
