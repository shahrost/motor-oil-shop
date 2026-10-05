import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import orderUnits from "../../data/orderUnits";
import paymentTypes from "../../data/paymentTypes";

// گزینه‌های <select> واحد خرید و نوع پرداخت (یک منبع: data/orderUnits و data/paymentTypes)
export function OrderUnitOptions() {
  const { t } = useContext(LanguageContext);

  return orderUnits.map((item) => (
    <option key={item.value} value={item.value}>
      {t(`common.orderUnit.${item.value}`)}
    </option>
  ));
}

export function PaymentTypeOptions() {
  const { t } = useContext(LanguageContext);

  return paymentTypes.map((item) => (
    <option key={item.value} value={item.value}>
      {item.icon} {t(`common.paymentType.${item.value}`)}
    </option>
  ));
}
