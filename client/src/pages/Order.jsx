import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";

function Order() {
  const {
    cart,

    clearCart,

    updateQuantity,

    changeOrderType,

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
      alert("لطفاً شماره موبایل معتبر وارد کنید (مثال: 09198334264)");

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

        image: item.image,

        orderType: item.orderType,

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

    clearCart();

    setSubmitted(true);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">ثبت نهایی سفارش</h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-5">🛒 محصولات انتخاب شده</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex flex-col md:flex-row gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>

                  <p>برند: {item.brand}</p>

                  <p>گرید: {item.viscosity}</p>

                  <p>حجم: {item.volume}</p>

                  <div className="mt-3 flex gap-3 items-center">
                    <span className="font-bold">نوع خرید:</span>

                    <select
                      value={item.orderType}
                      onChange={(e) =>
                        changeOrderType(
                          item.id,

                          e.target.value,
                        )
                      }
                      className="border p-2 rounded-lg"
                    >
                      <option value="number">عدد</option>

                      <option value="carton">کارتن</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    <span className="font-bold">تعداد:</span>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.id,

                          e.target.value,
                        )
                      }
                      className="border p-2 rounded-lg mr-3 w-24"
                    />
                  </div>
                </div>

                <div className="font-bold text-green-700">
                  {formatPrice(Number(item.price || 0) * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-xl">
            <p className="text-xl font-bold text-green-700">
              مبلغ کل سفارش: {formatPrice(cartTotal)}
            </p>
          </div>
        </div>

        {!submitted ? (
          <form
            onSubmit={submitOrder}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="text-xl font-bold mb-5">اطلاعات مشتری</h2>
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
              type="tel"
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
              <option>شهرک الهیه</option>
              <option>گلستان</option>
              <option>فشارقوی</option>
              <option>همدانک</option>
              <option>اورین</option>
              <option>خیرآباد</option>
              <option>صالحیه</option>
              <option>شاهدشهر</option>
              <option>الارد</option>
              <option>پیغمبر</option>
              <option>یقه</option>
              <option>کهنز</option>
              <option>انجم آباد</option>
              <option>جاده شهریار به رباط کریم</option>
              <option>جاده آدران</option>
              <option>صباشهر</option>
              <option>اسدآباد</option>
            </select>

            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="آدرس دقیق (خیابان، کوچه، پلاک...)"
              className="border p-3 rounded-lg w-full mb-4"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg w-full font-bold"
            >
              ثبت سفارش نهایی
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <div className="text-5xl mb-5">✅</div>

            <h2 className="text-2xl font-bold text-green-600">
              سفارش شما با موفقیت ثبت شد
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              کارشناسان فروش در اولین فرصت با شما تماس خواهند گرفت.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
