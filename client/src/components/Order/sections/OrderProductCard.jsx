import formatPrice from "../../../utils/formatPrice";
import PaymentSelector from "./PaymentSelector";
function OrderProductCard({
  item,
  index,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  const itemTotal =
    Number(item.price || 0) *
    (item.orderType === "carton"
      ? Number(item.quantity) * Number(item.cartonCount || 1)
      : Number(item.quantity));

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
      <h3 className="text-xl font-extrabold text-black">{item.name}</h3>

      <div className="mt-3 space-y-2 text-gray-700">
        <p>
          برند:
          <span className="font-bold text-black"> {item.brand}</span>
        </p>

        <p>
          گرید:
          <span className="font-bold text-black"> {item.viscosity}</span>
        </p>

        <p>
          حجم:
          <span className="font-bold text-black"> {item.volume}</span>
        </p>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">واحد سفارش</label>

        <select
          value={item.orderType || "number"}
          onChange={(e) => changeOrderType(item.id, e.target.value, index)}
          className="w-full border rounded-xl p-3"
        >
          <option value="number">عدد</option>
          <option value="carton">کارتن</option>
        </select>
      </div>

      <div className="mt-4 bg-white rounded-2xl p-4">
        <label className="font-bold block mb-2">تعداد</label>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, e.target.value, index)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <PaymentSelector
        paymentType={item.paymentType}
        onChange={(type) => changePaymentType(item.id, type, index)}
      />

      <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4">
        <p className="font-bold text-green-700">قیمت محصول:</p>

        <p className="text-2xl font-extrabold text-green-700 mt-2">
          {formatPrice(itemTotal)}
        </p>
      </div>
    </div>
  );
}

export default OrderProductCard;
