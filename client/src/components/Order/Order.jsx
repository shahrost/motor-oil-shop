import { Link } from "react-router-dom";

import useOrderForm from "./hooks/useOrderForm";
import OrderButtons from "./OrderButtons";
import OrderProducts from "./sections/OrderProducts";
import CustomerInfo from "./sections/CustomerInfo";
import OrderSuccess from "./sections/OrderSuccess";

function Order() {
  const {
    cart,
    customer,
    submitted,
    handleChange,
    submitOrder,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    changeAllPaymentType,
    cartTotal,
  } = useOrderForm();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-5">
        <div className="bg-white rounded-3xl shadow-md p-10 text-center">
          <div className="text-5xl">🛒</div>

          <h2 className="text-2xl font-bold mt-4">سبد خرید خالی است</h2>

          <Link
            to="/products"
            className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8">
          ثبت نهایی سفارش
        </h1>

        <OrderButtons changeAllPaymentType={changeAllPaymentType} />

        <OrderProducts
          cart={cart}
          cartTotal={cartTotal}
          updateQuantity={updateQuantity}
          changeOrderType={changeOrderType}
          changePaymentType={changePaymentType}
        />

        {!submitted ? (
          <form
            onSubmit={submitOrder}
            className="bg-white rounded-3xl shadow-md border p-6 mt-6"
          >
            <CustomerInfo customer={customer} handleChange={handleChange} />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              ثبت سفارش نهایی
            </button>
          </form>
        ) : (
          <OrderSuccess />
        )}
      </div>
    </div>
  );
}

export default Order;
