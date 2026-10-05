import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import PaymentSelector from "./PaymentSelector";
import LanguageContext from "../../../context/LanguageContext";
import { calcPromotionGift } from "../../../utils/promotionCalc";
import { getItemTotal } from "../../../utils/cartItemCalc";
import GiftBadge from "../../common/GiftBadge";
import { OrderUnitOptions } from "../../common/OrderOptions";

function OrderProductCard({
  item,
  index,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  const { language, t } = useContext(LanguageContext);

  const itemTotal = getItemTotal(item);

  const giftQty = calcPromotionGift(
    item.promotion,
    item.orderType,
    item.quantity,
    item.paymentType,
  );

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
      <h3 className="text-xl font-extrabold text-black">
        {getProductNameLabel(item.name, language)}
      </h3>

      <div className="mt-3 space-y-2 text-gray-700">
        <p>
          {t("common.brand")}
          <span className="font-bold text-black"> {item.brand}</span>
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
          onChange={(e) => changeOrderType(item.id, e.target.value, index)}
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
          onChange={(e) => updateQuantity(item.id, e.target.value, index)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <PaymentSelector
        paymentType={item.paymentType}
        onChange={(type) => changePaymentType(item.id, type, index)}
      />

      <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="font-bold text-gray-600">{t("order.productCard.price")}</p>

        <p className="text-2xl font-extrabold text-gray-950 mt-2">
          {formatPrice(itemTotal, language)}
        </p>
      </div>

      <GiftBadge giftQty={giftQty} className="mt-3 rounded-2xl p-3" />
    </div>
  );
}

export default OrderProductCard;
