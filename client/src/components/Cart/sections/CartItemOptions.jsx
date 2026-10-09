import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import { OrderUnitOptions, PaymentTypeOptions } from "../../common/OrderOptions";

function CartItemOptions({ item, onQuantityChange, onOrderTypeChange, onPaymentTypeChange }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="space-y-4">
      <div>
        <label className="font-bold block mb-2">{t("common.quantity")}</label>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="font-bold block mb-2">
          {t("common.orderUnitLabel")}
        </label>

        <select
          value={item.orderType}
          onChange={(e) => onOrderTypeChange(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <OrderUnitOptions />
        </select>
      </div>

      <div>
        <label className="font-bold block mb-2">{t("common.payment")}</label>

        <select
          value={item.paymentType}
          onChange={(e) => onPaymentTypeChange(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <PaymentTypeOptions />
        </select>
      </div>
    </div>
  );
}

export default CartItemOptions;
