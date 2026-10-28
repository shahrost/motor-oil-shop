import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import formatPrice from "../../../utils/formatPrice";
import LanguageContext from "../../../context/LanguageContext";

// جمع سبد + «ثبت سفارش» (دکمه‌ی اصلی، اول) و «ادامه‌ی خرید». «پاک کردن سبد» یک لینک کم‌رنگ
// جداست و قبل از پاک کردن تأیید می‌گیره (clearRequest از useCartPage)
function CartSummary({ cartTotal, clearRequest }) {
  const { language, t } = useContext(LanguageContext);

  return (
    <div className="bg-white rounded-3xl shadow p-6 mt-8">
      <h2 className="text-3xl font-extrabold text-gray-950">
        {t("cart.summary.total")} {formatPrice(cartTotal, language)}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Link
          to="/order"
          className="bg-yellow-400 text-gray-950 text-center py-4 rounded-xl font-bold md:order-2"
        >
          {t("cart.summary.checkout")}
        </Link>

        <Link
          to="/products"
          className="bg-gray-800 text-white text-center py-4 rounded-xl font-bold md:order-1"
        >
          {t("common.continueShopping")}
        </Link>
      </div>

      <div className="mt-5 text-center">
        {clearRequest.confirming ? (
          <div
            role="alertdialog"
            aria-label={t("cart.summary.clearConfirm")}
            className="inline-flex flex-wrap items-center justify-center gap-3 bg-red-50 rounded-xl px-4 py-3"
          >
            <span className="font-bold text-red-700">{t("cart.summary.clearConfirm")}</span>

            <button
              type="button"
              onClick={clearRequest.confirm}
              className="bg-red-600 text-white rounded-lg px-4 py-2 font-bold text-sm"
            >
              {t("cart.summary.confirmYes")}
            </button>

            <button
              type="button"
              onClick={clearRequest.cancel}
              autoFocus
              className="border border-gray-300 rounded-lg px-4 py-2 font-bold text-sm text-gray-700"
            >
              {t("cart.summary.confirmNo")}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={clearRequest.ask}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:underline"
          >
            <Trash2 size={16} /> {t("cart.summary.clear")}
          </button>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
