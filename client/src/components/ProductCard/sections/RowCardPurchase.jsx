import orderUnits from "../../../data/orderUnits";
import paymentTypes from "../../../data/paymentTypes";

const CONTROL_CLASS = "w-full border rounded-lg p-1 text-xs bg-white text-black";

// کنترل‌های خرید فشرده‌ی کارت ردیفی (واحد، تعداد، نوع پرداخت، افزودن به سبد).
// کلیک‌ها به لینک کارت نمی‌رسن تا با انتخاب گزینه‌ها صفحه‌ی محصول باز نشه.
function RowCardPurchase({
  t,
  orderType,
  setOrderType,
  quantity,
  setQuantity,
  paymentType,
  setPaymentType,
  added,
  onAddCart,
}) {
  return (
    <div className="mt-2 space-y-1" onClick={(e) => e.preventDefault()}>
      <select
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        className={CONTROL_CLASS}
      >
        {orderUnits.map((item) => (
          <option key={item.value} value={item.value}>
            {t(`common.orderUnit.${item.value}`)}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className={CONTROL_CLASS}
      />

      <select
        value={paymentType}
        onChange={(e) => setPaymentType(e.target.value)}
        className={CONTROL_CLASS}
      >
        {paymentTypes.map((item) => (
          <option key={item.value} value={item.value}>
            {item.icon} {t(`common.paymentType.${item.value}`)}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onAddCart}
        className="w-full mt-1 bg-yellow-400 hover:bg-yellow-500 text-gray-950 py-1.5 rounded-lg text-xs font-bold transition"
      >
        🛒 {t("common.addToCart")}
      </button>

      {added && (
        <p className="text-[11px] text-green-700 font-bold text-center">
          ✅ {t("common.addedToCart")}
        </p>
      )}
    </div>
  );
}

export default RowCardPurchase;
