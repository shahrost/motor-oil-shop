import { useContext } from "react";
import orderUnits from "../../../data/orderUnits";
import paymentTypes from "../../../data/paymentTypes";
import LanguageContext from "../../../context/LanguageContext";

function PurchaseBox({
  orderType,
  setOrderType,
  quantity,
  setQuantity,
  paymentType,
  setPaymentType,
}) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      className="
      mt-5
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
          h-11
          border
          rounded-lg
          px-2
          text-base
          bg-white
          "
        >
          {orderUnits.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`common.orderUnit.${item.value}`)}
            </option>
          ))}
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
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            if (value === "") {
              setQuantity("");
              return;
            }

            setQuantity(Math.max(1, Number(value)));
          }}
          className="
          w-full
          h-11
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
          h-11
          border
          rounded-lg
          px-2
          text-base
          "
        >
          {paymentTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.icon} {t(`common.paymentType.${item.value}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PurchaseBox;
