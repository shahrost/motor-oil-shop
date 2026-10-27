import { CircleCheck, ShoppingCart } from "lucide-react";
import orderUnits from "../../../data/orderUnits";
import { PaymentTypeOptions } from "../../common/OrderOptions";

const CONTROL_CLASS = "w-full border rounded-lg p-1 text-xs bg-white text-black";

// کنترل‌های خرید فشرده‌ی کارت ردیفی (واحد، تعداد، نوع پرداخت، افزودن به سبد).
// کلیک‌ها به لینک کارت نمی‌رسن تا با انتخاب گزینه‌ها صفحه‌ی محصول باز نشه.
function RowCardPurchase({
  t,
  product,
  canAdd = true,
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
        <PaymentTypeOptions product={product} />
      </select>

      <button
        type="button"
        onClick={onAddCart}
        disabled={!canAdd}
        className="w-full mt-1 flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-400 text-gray-950 py-1.5 rounded-lg text-xs font-bold transition"
      >
        <ShoppingCart size={16} /> {t("common.addToCart")}
      </button>

      {added && (
        <p className="text-[11px] text-green-700 font-bold flex items-center justify-center gap-1">
          <CircleCheck size={16} /> {t("common.addedToCart")}
        </p>
      )}
    </div>
  );
}

export default RowCardPurchase;
