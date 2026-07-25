import { useContext } from "react";
import { Link } from "react-router-dom";

import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";

function Cart() {
  const {
    cart,

    removeFromCart,

    updateQuantity,

    changeOrderType,

    changePaymentType,

    cartTotal,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-10 text-center" dir="rtl">
        <h1 className="text-3xl font-bold">🛒 سبد خرید خالی است</h1>

        <Link
          to="/products"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🛒 سبد خرید</h1>

        <div className="space-y-5">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="flex flex-col md:flex-row gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p>برند: {item.brand}</p>

                  <p>گرید: {item.viscosity}</p>

                  <p>حجم: {item.volume}</p>

                  <div className="mt-4">
                    <label className="font-bold">نوع خرید:</label>

                    <select
                      value={item.orderType}
                      onChange={(e) =>
                        changeOrderType(item.id, e.target.value, index)
                      }
                      className="mr-3 border p-2 rounded-lg"
                    >
                      <option value="number">عدد</option>

                      <option value="carton">کارتن</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold">تعداد:</label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, e.target.value, index)
                      }
                      className="mr-3 border p-2 rounded-lg w-24"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="font-bold">پرداخت:</label>

                    <select
                      value={item.paymentType || "cash"}
                      onChange={(e) =>
                        changePaymentType(item.id, e.target.value, index)
                      }
                      className="mr-3 border p-2 rounded-lg"
                    >
                      <option value="cash">💵 نقدی</option>

                      <option value="check">📝 چکی ۳ ماهه</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="text-green-700 font-bold text-lg">
                    {formatPrice(
                      Number(item.price || 0) *
                        (item.orderType === "carton"
                          ? Number(item.quantity) *
                            Number(item.cartonCount || 1)
                          : Number(item.quantity)),
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, index)}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg mt-5"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <p className="text-2xl font-bold text-green-700">
            مبلغ کل: {formatPrice(cartTotal)}
          </p>

          <Link
            to="/order"
            className="block text-center mt-6 bg-green-600 text-white py-3 rounded-lg font-bold"
          >
            ادامه ثبت سفارش
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
