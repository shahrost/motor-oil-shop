import orderUnits from "../../../data/orderUnits";
import paymentTypes from "../../../data/paymentTypes";

function PurchaseBox({
  orderType,
  setOrderType,
  quantity,
  setQuantity,
  paymentType,
  setPaymentType,
}) {
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
        <label className="text-xs font-bold block mb-1">واحد خرید</label>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="
          w-full
          h-10
          border
          rounded-lg
          px-2
          text-sm
          bg-white
          "
        >
          {orderUnits.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-bold block mb-1">تعداد</label>

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
          h-10
          border
          rounded-lg
          px-2
          text-sm
          "
        />
      </div>

      <div>
        <label className="text-xs font-bold block mb-1">پرداخت</label>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="
          w-full
          h-10
          border
          rounded-lg
          px-2
          text-sm
          "
        >
          {paymentTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.icon} {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PurchaseBox;
