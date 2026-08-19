function OrderButtons({ changeAllPaymentType }) {
  return (
    <div className="bg-white rounded-3xl shadow-md border p-5 mb-6">
      <h2 className="text-xl font-bold text-black mb-5">
        💳 روش پرداخت کل سفارش
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => changeAllPaymentType("cash")}
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition"
        >
          💵 همه نقدی
        </button>

        <button
          type="button"
          onClick={() => changeAllPaymentType("check")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition"
        >
          📝 همه اعتباری
        </button>
      </div>
    </div>
  );
}

export default OrderButtons;
