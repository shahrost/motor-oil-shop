import orderUnits from "../../../data/orderUnits";
import paymentTypes from "../../../data/paymentTypes";

const LABEL_CLASS = "text-gray-500 font-bold shrink-0";
const SELECT_CLASS = "border rounded-lg p-1 bg-white text-black";

// انتخاب واحد، تعداد و نوع پرداخت در صفحه‌ی محصول
function PurchaseOptions({
  t,
  orderType,
  setOrderType,
  quantity,
  setQuantity,
  paymentType,
  setPaymentType,
}) {
  return (
    <div className="mt-6 space-y-3 text-black">
      <div className="flex items-center gap-2">
        <span className={LABEL_CLASS}>{t("common.orderUnitLabel")}</span>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className={SELECT_CLASS}
        >
          {orderUnits.map((item) => (
            <option key={item.value} value={item.value}>
              {t(`common.orderUnit.${item.value}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className={LABEL_CLASS}>{t("common.quantity")}</span>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-24 border rounded-lg p-1 text-black"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className={LABEL_CLASS}>{t("common.payment")}</span>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className={SELECT_CLASS}
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

export default PurchaseOptions;
