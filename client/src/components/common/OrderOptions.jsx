import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";
import orderUnits from "../../data/orderUnits";
import paymentTypes from "../../data/paymentTypes";
import { isPaymentTypeDisabled } from "../../utils/productPrice";

// گزینه‌های <select> واحد خرید و نوع پرداخت (یک منبع: data/orderUnits و data/paymentTypes)
export function OrderUnitOptions() {
  const { t } = useContext(LanguageContext);

  return orderUnits.map((item) => (
    <option key={item.value} value={item.value}>
      {t(`common.orderUnit.${item.value}`)}
    </option>
  ));
}

// product: روش پرداختی که قیمت نداره (وقتی روش دیگه قیمت داره) غیرفعال می‌شه
export function PaymentTypeOptions({ product } = {}) {
  const { t } = useContext(LanguageContext);

  return paymentTypes.map((item) => (
    <option
      key={item.value}
      value={item.value}
      disabled={isPaymentTypeDisabled(product, item.value)}
    >
      {t(`common.paymentType.${item.value}`)}
    </option>
  ));
}
