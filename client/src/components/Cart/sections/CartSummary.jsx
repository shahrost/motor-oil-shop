import { Link } from "react-router-dom";
import formatPrice from "../../../utils/formatPrice";

function CartSummary({ cartTotal, clearCart }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6 mt-8">
      <h2 className="text-3xl font-extrabold text-green-700">
        مبلغ کل: {formatPrice(cartTotal)}
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link
          to="/products"
          className="bg-gray-800 text-white text-center py-4 rounded-xl font-bold"
        >
          ادامه خرید
        </Link>

        <button
          onClick={clearCart}
          className="bg-red-600 text-white rounded-xl font-bold"
        >
          پاک کردن سبد
        </button>

        <Link
          to="/order"
          className="bg-green-600 text-white text-center py-4 rounded-xl font-bold"
        >
          ثبت سفارش
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
