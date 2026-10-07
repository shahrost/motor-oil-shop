import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import { calcPromotionGift } from "../../../utils/promotionCalc";
import GiftBadge from "../../common/GiftBadge";
import { OrderUnitOptions, PaymentTypeOptions } from "../../common/OrderOptions";

function PurchaseBox({
  product,
  orderType,
  setOrderType,
  quantity,
  setQuantity,
  paymentType,
  setPaymentType,
}) {
  const { t } = useContext(LanguageContext);

  const giftQty = calcPromotionGift(
    product?.promotion,
    orderType,
    quantity,
    paymentType,
  );

  return (
    <div
      className="
      mt-3
      grid
      grid-cols-3
      gap-2
      "
    >
      <div>
        <label className="text-sm font-bold block mb-1">
          {t("common.orderUnitLabel")}
        </label>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="
          w-full
          h-10
          border
          rounded-lg
          px-2
          text-base
          bg-white
          "
        >
          <OrderUnitOptions />
        </select>
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">
          {t("common.quantity")}
        </label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="
          w-full
          h-10
          border
          rounded-lg
          px-2
          text-base
          "
        />
      </div>

      <div>
        <label className="text-sm font-bold block mb-1">
          {t("common.payment")}
        </label>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="
          w-full
          h-10
          border
          rounded-lg
          px-2
          text-base
          "
        >
          <PaymentTypeOptions />
        </select>
      </div>

      <GiftBadge
        giftQty={giftQty}
        className="col-span-3 mt-1 rounded-lg p-2 text-sm"
      />
    </div>
  );
}

export default PurchaseBox;
