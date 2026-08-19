function PaymentSelector({ paymentType, onChange }) {
  return (
    <div className="mt-4 bg-white rounded-2xl p-4">
      <label className="font-bold block mb-2">نحوه پرداخت</label>

      <select
        value={paymentType || "cash"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl p-3"
      >
        <option value="cash">💵 نقدی</option>
        <option value="check">📝 اعتباری</option>
      </select>
    </div>
  );
}

export default PaymentSelector;
