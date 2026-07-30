import { Link } from "react-router-dom";
import { useContext } from "react";

import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    changeOrderType,
    changePaymentType,
    clearCart,
    cartTotal,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-10 text-center" dir="rtl">
        <div className="bg-white rounded-3xl shadow p-10 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-black">سبد خرید خالی است</h1>

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
    <div className="min-h-screen bg-gray-100 p-5 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-black mb-8">
          🛒 سبد خرید
        </h1>

        <div className="space-y-5">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow p-5 grid md:grid-cols-4 gap-5"
            >
              <div className="bg-gray-50 rounded-2xl p-3">
                <img
                  src={item.image?.main || ""}
                  alt={item.name}
                  className="w-full h-32 object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-black">{item.name}</h2>

                <p className="mt-2">
                  برند:
                  <b className="text-green-700"> {item.brand}</b>
                </p>

                <p>
                  گرید:
                  <b className="text-green-700"> {item.viscosity}</b>
                </p>
              </div>

              <div className="space-y-4">
                <div>
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

                <div>
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

                <div>
                  <label className="font-bold block mb-2">پرداخت</label>

                  <select
                    value={item.paymentType}
                    onChange={(e) =>
                      changePaymentType(item.id, e.target.value, index)
                    }
                    className="w-full border rounded-xl p-3"
                  >
                    <option value="cash">💵 نقدی</option>

                    <option value="check">📝اعتباری</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-green-700 text-2xl font-extrabold">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, index)}
                  className="bg-red-600 text-white rounded-xl py-3 font-bold"
                >
                  حذف محصول
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow p-6 mt-8">
          <h2 className="text-3xl font-extrabold text-green-700">
            مبلغ کل: {formatPrice(cartTotal)}
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Link
              to="/products"
              className="bg-gray-800 text-white text-center py-4 rounded-xl font-bold"
            >
              ادامه خرید
            </Link>

            <button
              onClick={clearCart}
              className="bg-red-600 text-white rounded-xl font-bold"
            >
              پاک کردن سبد
            </button>

            <Link
              to="/order"
              className="bg-green-600 text-white text-center py-4 rounded-xl font-bold"
            >
              ثبت سفارش
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
