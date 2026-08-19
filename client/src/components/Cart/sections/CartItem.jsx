import formatPrice from "../../../utils/formatPrice";
import getImageUrl from "../../../utils/getImageUrl";

function CartItem({
  item,
  index,
  removeFromCart,
  updateQuantity,
  changeOrderType,
  changePaymentType,
}) {
  return (
    <div className="bg-white rounded-3xl shadow p-5 grid md:grid-cols-4 gap-5">
      <div className="bg-gray-50 rounded-2xl p-3">
        <img
          src={getImageUrl(item.image?.main)}
          alt={item.name}
          className="w-full h-32 object-contain"
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-black">{item.name}</h2>

        <p className="mt-2">
          برند:
          <b className="text-green-700"> {item.brand}</b>
        </p>

        <p>
          گرید:
          <b className="text-green-700"> {item.viscosity}</b>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-bold block mb-2">تعداد</label>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-bold block mb-2">واحد خرید</label>

          <select
            value={item.orderType}
            onChange={(e) => changeOrderType(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          >
            <option value="number">عدد</option>
            <option value="carton">کارتن</option>
          </select>
        </div>

        <div>
          <label className="font-bold block mb-2">پرداخت</label>

          <select
            value={item.paymentType}
            onChange={(e) => changePaymentType(item.id, e.target.value, index)}
            className="w-full border rounded-xl p-3"
          >
            <option value="cash">💵 نقدی</option>
            <option value="check">📝 اعتباری</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-green-700 text-2xl font-extrabold">
          {formatPrice(item.price)}
        </p>

        <button
          onClick={() => removeFromCart(item.id, index)}
          className="bg-red-600 text-white rounded-xl py-3 font-bold"
        >
          حذف محصول
        </button>
      </div>
    </div>
  );
}

export default CartItem;
