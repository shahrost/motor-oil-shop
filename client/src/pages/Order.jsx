import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";
import { Link } from "react-router-dom";

function Order() {
  const {
    cart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    changeAllPaymentType,
    cartTotal,
  } = useContext(CartContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center text-2xl font-bold" dir="rtl">
        سبد خرید خالی است
      </div>
    );
  }

  function handleChange(e) {
    setCustomer({
      ...customer,

      [e.target.name]: e.target.value,
    });
  }

  function submitOrder(e) {
    e.preventDefault();

    if (customer.phone.length !== 11 || !customer.phone.startsWith("09")) {
      alert("لطفاً شماره موبایل معتبر وارد کنید");

      return;
    }

    const order = {
      id: Date.now(),

      customer,

      items: cart.map((item) => ({
        productId: item.id,

        productName: item.name,

        brand: item.brand,

        viscosity: item.viscosity,

        volume: item.volume,

        orderType: item.orderType || "number",

        paymentType: item.paymentType || "cash",

        quantity: item.quantity,

        totalCount:
          item.orderType === "carton"
            ? item.quantity * Number(item.cartonCount || 1)
            : item.quantity,

        price: item.price,
      })),

      totalPrice: cartTotal,

      status: "جدید",

      date: new Date().toLocaleString("fa-IR"),
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",

      JSON.stringify([...oldOrders, order]),
    );

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">ثبت نهایی سفارش</h1>

        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="font-bold text-xl mb-4">پرداخت کل سفارش</h2>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => changeAllPaymentType("cash")}
              className="bg-green-600 text-white px-5 py-3 rounded-lg"
            >
              💵 همه نقدی
            </button>

            <button
              type="button"
              onClick={() => changeAllPaymentType("check")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              📝 همه چکی ۳ ماهه
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-5">🛒 محصولات سفارش</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="border rounded-xl p-4">
                <h3 className="font-bold text-lg">{item.name}</h3>

                <p>برند: {item.brand}</p>

                <p>گرید: {item.viscosity}</p>

                <p>حجم: {item.volume}</p>

                <div className="mt-3">
                  <label className="font-bold">نوع خرید:</label>

                  <select
                    value={item.orderType}
                    onChange={(e) => changeOrderType(item.id, e.target.value)}
                    className="mr-3 border p-2 rounded-lg"
                  >
                    <option value="number">عدد</option>

                    <option value="carton">کارتن</option>
                  </select>
                </div>

                <div className="mt-3">
                  <label className="font-bold">تعداد:</label>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                    className="mr-3 border p-2 rounded-lg w-24"
                  />
                </div>

                <div className="mt-3">
                  <label className="font-bold">پرداخت:</label>

                  <select
                    value={item.paymentType || "cash"}
                    onChange={(e) => changePaymentType(item.id, e.target.value)}
                    className="mr-3 border p-2 rounded-lg"
                  >
                    <option value="cash">نقدی</option>

                    <option value="check">چکی ۳ ماهه</option>
                  </select>
                </div>

                <p className="text-green-700 font-bold mt-4">
                  {formatPrice(Number(item.price || 0) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <p className="text-xl font-bold text-green-700">
              مبلغ کل سفارش:
              {formatPrice(cartTotal)}
            </p>
          </div>
        </div>

        {!submitted ? (
          <form
            onSubmit={submitOrder}
            className="bg-white rounded-xl shadow p-6"
          >
            <h2 className="font-bold text-xl mb-5">اطلاعات مشتری</h2>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی"
              className="border p-3 rounded-lg w-full mb-3"
              required
            />

            <input
              name="phone"
              value={customer.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 11) {
                  setCustomer({
                    ...customer,

                    phone: value,
                  });
                }
              }}
              placeholder="مثال: 09198334264"
              maxLength="11"
              className="border p-3 rounded-lg w-full mb-3"
              required
            />

            <select
              name="area"
              value={customer.area}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full mb-3"
              required
            >
              <option value="">انتخاب منطقه</option>

              <option>پرند</option>

              <option>رباط کریم</option>

              <option>نصیرشهر</option>

              <option>نسیم شهر</option>

              <option>جاده ساوه</option>

              <option>بهارستان</option>

              <option>صباشهر</option>

              <option>اسدآباد</option>
            </select>

            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="آدرس دقیق"
              className="border p-3 rounded-lg w-full mb-4"
              required
            />

            <button className="bg-green-600 text-white py-3 rounded-lg w-full font-bold">
              ثبت سفارش نهایی
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="text-6xl">✅</div>

            <h2 className="text-3xl font-bold text-green-600 mt-5">
              سفارش ثبت شد
            </h2>

            <Link
              to="/products"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              ادامه خرید
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
