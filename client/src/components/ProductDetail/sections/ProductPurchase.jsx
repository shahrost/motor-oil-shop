function ProductPurchase({
  quantity,
  setQuantity,
  orderType,
  setOrderType,
  paymentType,
  setPaymentType,
  finalCount,
  handleCart,
  added,
}) {
  return (
    <div className="mt-8">
      <div className="bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          واحد خرید
        </label>

        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="number">عدد</option>
          <option value="carton">کارتن</option>
        </select>
      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          تعداد
        </label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      <div className="mt-5 bg-gray-50 rounded-2xl p-5">
        <label className="font-bold block mb-2">
          پرداخت
        </label>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full border rounded-xl p-3"
        >
          <option value="cash">💵 نقدی</option>
          <option value="check">📝 اعتباری</option>
        </select>
      </div>

      <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="font-bold text-green-700">
          تعداد نهایی:
        </p>

        <p className="text-3xl font-extrabold mt-2">
          {finalCount()} عدد
        </p>
      </div>

      <button
        type="button"
        onClick={handleCart}
        className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition"
      >
        🛒 افزودن به سبد خرید
      </button>

      {added && (
        <div className="mt-5 bg-green-600 text-white p-4 rounded-xl text-center font-bold">
          ✅ به سبد خرید اضافه شد
        </div>
      )}
    </div>
  );
}

export default ProductPurchase;