import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getImageUrl from "../../../utils/getImageUrl";
import getBrandLabel from "../../../utils/brandLabel";
import LanguageContext from "../../../context/LanguageContext";
import { calcPromotionGift } from "../../../utils/promotionCalc";

function CartItem({
  item,
  index,
  removeFromCart,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  const { language, t } = useContext(LanguageContext);

  const giftQty = calcPromotionGift(
    item.promotion,
    item.orderType,
    item.quantity,
    item.paymentType,
  );

  return (
    <div className="bg-white rounded-3xl shadow p-5 grid md:grid-cols-4 gap-5">
      <div className="bg-gray-50 rounded-2xl p-3">
        <img
          src={getImageUrl(item.image?.main)}
          alt={item.name}
          className="w-full h-32 object-contain"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-black">{item.name}</h2>

        <p className="mt-2">
          {t("common.brand")}
          <b className="text-green-700">
            {" "}
            {getBrandLabel(item.brand, language)}
          </b>
        </p>

        <p>
          {t("common.viscosity")}
          <b className="text-green-700"> {item.viscosity}</b>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-bold block mb-2">{t("common.quantity")}</label>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-bold block mb-2">
            {t("common.orderUnitLabel")}
          </label>

          <select
            value={item.orderType}
            onChange={(e) => changeOrderType(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          >
            <option value="number">{t("common.orderUnit.number")}</option>
            <option value="carton">{t("common.orderUnit.carton")}</option>
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">{t("common.payment")}</label>

          <select
            value={item.paymentType}
            onChange={(e) => changePaymentType(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          >
            <option value="cash">💵 {t("common.paymentType.cash")}</option>
            <option value="check">📝 {t("common.paymentType.check")}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-green-700 text-2xl font-extrabold">
          {formatPrice(item.price, language)}
        </p>

        {giftQty > 0 && (
          <p className="bg-amber-50 border border-amber-300 text-amber-800 rounded-lg p-2 text-sm font-bold text-center">
            🎁 {t("common.promotion.giftEarned")} {giftQty}{" "}
            {t("common.orderUnit.carton")}
          </p>
        )}

        <button
          onClick={() => removeFromCart(item.id, index)}
          className="bg-red-600 text-white rounded-xl py-3 font-bold"
        >
          {t("cart.removeItem")}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
