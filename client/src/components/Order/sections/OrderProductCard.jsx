import { useContext } from "react";
import { formatVolume } from "../../../utils/formatVolume";
import PaymentSelector from "./PaymentSelector";
import LanguageContext from "../../../context/LanguageContext";
import useCartItem from "../../../hooks/useCartItem";
import GiftBadge from "../../common/GiftBadge";
import { OrderUnitOptions } from "../../common/OrderOptions";
import { getItemUnitCount } from "../../../utils/cartItemCalc";

function OrderProductCard({ item, index }) {
  const { language, t } = useContext(LanguageContext);
  const {
    name,
    brandLabel,
    priceLabel,
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

      <PaymentSelector
        paymentType={item.paymentType}
        onChange={setPaymentType}
        product={item}
      />

      {/* قیمت هر عدد و زیرش جمع این ردیف با تعداد انتخاب‌شده */}
      <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold text-gray-600">{t("order.productCard.unitPrice")}</p>

          <p className="text-lg font-bold text-gray-800">{priceLabel}</p>
        </div>

        <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-yellow-200">
          <p className="font-bold text-gray-600">
            {t("order.productCard.lineTotal")} ({getItemUnitCount(item)}{" "}
            {t("common.orderUnit.number")})
          </p>

          <p className="text-2xl font-extrabold text-gray-950">{totalLabel}</p>
        </div>
      </div>

      <GiftBadge giftQty={giftQty} className="mt-3 rounded-2xl p-3" />
    </div>
  );
}

export default OrderProductCard;
