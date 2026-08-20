import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import PaymentSelector from "./PaymentSelector";
import LanguageContext from "../../../context/LanguageContext";

function OrderProductCard({
  item,
  index,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  const { language, t } = useContext(LanguageContext);

  const itemTotal =
    Number(item.price || 0) *
    (item.orderType === "carton"
      ? Number(item.quantity) * Number(item.cartonCount || 1)
      : Number(item.quantity));

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
      <h3 className="text-xl font-extrabold text-black">{item.name}</h3>

      <div className="mt-3 space-y-2 text-gray-700">
        <p>
          {t("common.brand")}
          <span className="font-bold text-black"> {item.brand}</span>
        </p>

        <p>
          {t("common.viscosity")}
          <span className="font-bold text-black"> {item.viscosity}</span>
        </p>

        <p>
          {t("common.volume")}
          <span className="font-bold text-black"> {item.volume}</span>
        </p>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">
          {t("order.productCard.orderUnitLabel")}
        </label>

        <select
          value={item.orderType || "number"}
          onChange={(e) => changeOrderType(item.id, e.target.value, index)}
          className="w-full border rounded-xl p-3"
        >
          <option value="number">{t("common.orderUnit.number")}</option>
          <option value="carton">{t("common.orderUnit.carton")}</option>
        </select>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">{t("common.quantity")}</label>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, e.target.value, index)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <PaymentSelector
        paymentType={item.paymentType}
        onChange={(type) => changePaymentType(item.id, type, index)}
      />

      <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="font-bold text-green-700">{t("order.productCard.price")}</p>

        <p className="text-2xl font-extrabold text-green-700 mt-2">
          {formatPrice(itemTotal, language)}
        </p>
      </div>
    </div>
  );
}

export default OrderProductCard;
