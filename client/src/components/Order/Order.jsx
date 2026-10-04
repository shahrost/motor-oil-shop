import { useContext } from "react";
import { Link } from "react-router-dom";

import useOrderForm from "./hooks/useOrderForm";
import OrderButtons from "./OrderButtons";
import OrderProducts from "./sections/OrderProducts";
import CustomerInfo from "./sections/CustomerInfo";
import OrderSuccess from "./sections/OrderSuccess";
import LanguageContext from "../../context/LanguageContext";

function Order() {
  const { t } = useContext(LanguageContext);
  const {
    cart,
    customer,
    submitted,
    submitting,
    submitError,
    handleChange,
    submitOrder,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    changeAllPaymentType,
    cartTotal,
  } = useOrderForm();

  // بعد از ثبت موفق سبد خالی می‌شه؛ پیام موفقیت باید قبل از حالت «سبد خالی» بررسی بشه
  if (submitted) {
    return (
      <div className="px-5 py-8">
        <div className="max-w-5xl mx-auto">
          <OrderSuccess />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-md p-10 text-center">
          <div className="text-5xl">🛒</div>

          <h2 className="text-2xl font-bold mt-4">{t("cart.empty.title")}</h2>

          <Link
            to="/products"
            className="inline-block mt-6 bg-yellow-400 text-gray-950 px-8 py-3 rounded-xl font-bold"
          >
            {t("common.viewProducts")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          {t("order.title")}
        </h1>

        <OrderButtons changeAllPaymentType={changeAllPaymentType} />

        <OrderProducts
          cart={cart}
          cartTotal={cartTotal}
          updateQuantity={updateQuantity}
          changeOrderType={changeOrderType}
          changePaymentType={changePaymentType}
        />

        <form
          onSubmit={submitOrder}
          className="bg-white rounded-3xl shadow-md border p-6 mt-6"
        >
          <CustomerInfo customer={customer} handleChange={handleChange} />

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
      </div>
    </div>
  );
}

export default Order;
