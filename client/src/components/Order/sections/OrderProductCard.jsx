import { useContext } from "react";
import { formatVolume } from "../../../utils/formatVolume";
import PaymentSelector from "./PaymentSelector";
import LanguageContext from "../../../context/LanguageContext";
import useCartItem from "../../../hooks/useCartItem";
import GiftBadge from "../../common/GiftBadge";
import { OrderUnitOptions } from "../../common/OrderOptions";

function OrderProductCard({ item, index }) {
  const { language, t } = useContext(LanguageContext);
  const {
    name,
    brandLabel,
    totalLabel,
    giftQty,
    setQuantity,
    setOrderType,
    setPaymentType,
  } = useCartItem(item, index);

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
      <h3 className="text-xl font-extrabold text-black">{name}</h3>

      <div className="mt-3 space-y-2 text-gray-700">
        <p>
          {t("common.brand")}
          <span className="font-bold text-black"> {brandLabel}</span>
        </p>

        {item.viscosity && (
          <p>
            {t("common.viscosity")}
            <span className="font-bold text-black"> {item.viscosity}</span>
          </p>
        )}

        <p>
          {t("common.volume")}
          <span className="font-bold text-black">
            {" "}
            {formatVolume(item.volume, language)}
          </span>
        </p>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">
          {t("order.productCard.orderUnitLabel")}
        </label>

        <select
          value={item.orderType || "number"}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <OrderUnitOptions />
        </select>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">{t("common.quantity")}</label>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <PaymentSelector paymentType={item.paymentType} onChange={setPaymentType} />

      <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="font-bold text-gray-600">{t("order.productCard.price")}</p>

        <p className="text-2xl font-extrabold text-gray-950 mt-2">{totalLabel}</p>
      </div>

      <GiftBadge giftQty={giftQty} className="mt-3 rounded-2xl p-3" />
    </div>
  );
}

export default OrderProductCard;
