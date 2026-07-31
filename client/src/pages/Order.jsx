import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";
import { Link } from "react-router-dom";
import OrderContext from "../context/OrderContext";

function Order() {
  const {
    cart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    changeAllPaymentType,
    cartTotal,
    clearCart,
  } = useContext(CartContext);

  const { addOrder } = useContext(OrderContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    area: "",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (cart.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100 p-5"
        dir="rtl"
      >
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center">
          <div className="text-5xl mb-5">🛒</div>
          <h2 className="text-2xl font-bold text-black">سبد خرید خالی است</h2>

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
            ? Number(item.quantity) * Number(item.cartonCount || 1)
            : Number(item.quantity),

        price: item.price,
      })),

      totalPrice: cartTotal,

      status: "جدید",

      date: new Date().toLocaleString("fa-IR"),
    };

    addOrder(order);
    clearCart();

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-10">
          ثبت نهایی سفارش
        </h1>

        {/* پرداخت کلی */}

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

        {/* محصولات */}

        <div className="bg-white rounded-3xl shadow-md border p-5 mb-6">
          <h2 className="text-xl font-bold text-black mb-6">
            🛒 محصولات سفارش
          </h2>

          <div className="space-y-5">
            {cart.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-5 bg-gray-50"
              >
                <h3 className="text-xl font-extrabold text-black">
                  {item.name}
                </h3>

                <div className="mt-3 space-y-2 text-gray-700">
                  <p>
                    برند:
                    <span className="font-bold text-black"> {item.brand}</span>
                  </p>

                  <p>
                    گرید:
                    <span className="font-bold text-black">
                      {" "}
                      {item.viscosity}
                    </span>
                  </p>

                  <p>
                    حجم:
                    <span className="font-bold text-black"> {item.volume}</span>
                  </p>
                </div>

                <div className="mt-5 bg-white rounded-2xl p-4">
                  <label className="font-bold block mb-2">واحد خرید</label>

                  <select
                    value={item.orderType}
                    onChange={(e) =>
                      changeOrderType(item.id, e.target.value, index)
                    }
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
                    onChange={(e) =>
                      updateQuantity(item.id, e.target.value, index)
                    }
                    className="w-full border rounded-xl p-3"
                  />
                </div>

                <div className="mt-4 bg-white rounded-2xl p-4">
                  <label className="font-bold block mb-2">نحوه پرداخت</label>

                  <select
                    value={item.paymentType || "cash"}
                    onChange={(e) =>
                      changePaymentType(item.id, e.target.value, index)
                    }
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="cash">💵 نقدی</option>

                    <option value="check">📝 اعتباری</option>
                  </select>
                </div>

                <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="font-bold text-green-700">قیمت محصول:</p>

                  <p className="text-2xl font-extrabold text-green-700 mt-2">
                    {formatPrice(
                      Number(item.price || 0) *
                        (item.orderType === "carton"
                          ? Number(item.quantity) *
                            Number(item.cartonCount || 1)
                          : Number(item.quantity)),
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-green-100 border border-green-300 rounded-2xl p-5">
            <p className="text-xl font-extrabold text-green-700">
              مبلغ کل سفارش: {formatPrice(cartTotal)}
            </p>
          </div>
        </div>

        {!submitted ? (
          <form
            onSubmit={submitOrder}
            className="bg-white rounded-3xl shadow-md border p-6"
          >
            <h2 className="text-xl font-extrabold text-black mb-6">
              👤 اطلاعات مشتری
            </h2>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی"
              className="w-full border rounded-xl p-4 mb-4"
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
              className="w-full border rounded-xl p-4 mb-4"
              required
            />

            <select
              name="area"
              value={customer.area}
              onChange={handleChange}
              className="w-full border rounded-xl p-4 mb-4"
              required
            >
              <option value="">انتخاب منطقه</option>

              <option>پرند</option>
              <option>رباط کریم</option>
              <option>نسیم شهر</option>
              <option>نصیرشهر</option>
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
              rows="4"
              className="w-full border rounded-xl p-4 mb-5"
              required
            />

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition">
              ثبت سفارش نهایی
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-3xl shadow-md border p-10 text-center">
            <div className="text-6xl">✅</div>

            <h2 className="text-3xl font-extrabold text-green-600 mt-5">
              سفارش شما ثبت شد
            </h2>

            <p className="mt-4 text-gray-600">سفارش شما برای بررسی ارسال شد.</p>

            <Link
              to="/products"
              className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-xl font-bold"
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
