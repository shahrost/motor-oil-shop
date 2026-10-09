import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import CustomerInfo from "./CustomerInfo";

// فرم مشخصات مشتری + دکمه‌ی ثبت سفارش و پیام خطا
function OrderForm({
  customer,
  onChange,
  onPhoneChange,
  onSubmit,
  submitting,
  submitError,
}) {
  const { t } = useContext(LanguageContext);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-md border p-6 mt-6"
    >
      <CustomerInfo
        customer={customer}
        onChange={onChange}
        onPhoneChange={onPhoneChange}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-950 py-4 rounded-xl font-bold text-lg transition disabled:opacity-60"
      >
        {submitting ? t("order.submitting") : t("order.submit")}
      </button>

      {submitError && (
        <p className="mt-4 bg-red-100 text-red-700 rounded-xl p-3 text-center font-bold">
          {submitError}
        </p>
      )}
    </form>
  );
}

export default OrderForm;
