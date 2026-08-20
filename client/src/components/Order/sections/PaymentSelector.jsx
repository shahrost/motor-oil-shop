import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function PaymentSelector({ paymentType, onChange }) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="mt-4 bg-white rounded-2xl p-4">
      <label className="font-bold block mb-2">
        {t("order.paymentSelector.label")}
      </label>

      <select
        value={paymentType || "cash"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl p-3"
      >
        <option value="cash">💵 {t("common.paymentType.cash")}</option>
        <option value="check">📝 {t("common.paymentType.check")}</option>
      </select>
    </div>
  );
}

export default PaymentSelector;
