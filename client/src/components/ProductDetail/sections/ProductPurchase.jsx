import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ProductPurchase({
  quantity,
  setQuantity,
  orderType,
  setOrderType,
  paymentType,
  setPaymentType,
  finalCount,
  handleCart,
  added,
}) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-8">
      <div className="bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          {t("common.orderUnitLabel")}
        </label>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="number">{t("common.orderUnit.number")}</option>
          <option value="carton">{t("common.orderUnit.carton")}</option>
        </select>
      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          {t("common.quantity")}
        </label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          {t("common.payment")}
        </label>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="cash">💵 {t("common.paymentType.cash")}</option>
          <option value="check">📝 {t("common.paymentType.check")}</option>
        </select>
      </div>

      <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="font-bold text-green-700">
          {t("productDetail.finalCount")}
        </p>

        <p className="text-3xl font-extrabold mt-2">
          {finalCount()} {t("common.orderUnit.number")}
        </p>
      </div>

      <button
        type="button"
        onClick={handleCart}
        className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition"
      >
        🛒 {t("common.addToCart")}
      </button>

      {added && (
        <div className="mt-5 bg-green-600 text-white p-4 rounded-xl text-center font-bold">
          ✅ {t("common.addedToCart")}
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;
