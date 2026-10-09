import { useContext } from "react";

import useOrderForm from "./hooks/useOrderForm";
import {
  OrderButtons,
  OrderProducts,
  OrderForm,
  OrderSuccess,
} from "./sections";
import EmptyCart from "../common/EmptyCart";
import LanguageContext from "../../context/LanguageContext";

function Order() {
  const { t } = useContext(LanguageContext);
  const {
    cart,
    cartTotal,
    customer,
    submitted,
    submitting,
    submitError,
    handleChange,
    changePhone,
    submitOrder,
    changeAllPaymentType,
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
    return <EmptyCart icon="🛒" />;
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          {t("order.title")}
        </h1>

        <OrderButtons changeAllPaymentType={changeAllPaymentType} />

        <OrderProducts cart={cart} cartTotal={cartTotal} />

        <OrderForm
          customer={customer}
          onChange={handleChange}
          onPhoneChange={changePhone}
          onSubmit={submitOrder}
          submitting={submitting}
          submitError={submitError}
        />
      </div>
    </div>
  );
}

export default Order;
