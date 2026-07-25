import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import formatPrice from "../utils/formatPrice";
import CartContext from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const [orderType, setOrderType] = useState("number");

  const [paymentType, setPaymentType] = useState("cash");

  const [added, setAdded] = useState(false);

  function handleAddCart() {
    addToCart({
      ...product,

      quantity: Number(quantity),

      orderType,

      paymentType,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  function finalCount() {
    if (orderType === "carton") {
      return Number(quantity) * Number(product.cartonCount || 1);
    }

    return Number(quantity);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="p-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-contain"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {product.isNew && (
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
              🆕 جدید
            </span>
          )}

          {product.isBestSeller && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
              🔥 پرفروش
            </span>
          )}

          {product.isSpecial && (
            <span className="bg-yellow-400 px-3 py-1 rounded-lg text-sm">
              ⭐ ویژه
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold mt-5">{product.name}</h2>

        <div className="mt-4 space-y-2">
          <p>
            <b>برند:</b> {product.brand}
          </p>

          <p>
            <b>گرید:</b> {product.viscosity}
          </p>

          <p>
            <b>حجم:</b> {product.volume}
          </p>

          <p className="text-yellow-600 font-bold text-xl">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* انتخاب خرید */}

        <div className="mt-5 border rounded-lg p-3">
          <p className="font-bold mb-2">نوع خرید:</p>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option value="number">عدد</option>

            <option value="carton">کارتن</option>
          </select>
        </div>

        {/* تعداد */}

        <div className="mt-4">
          <label className="font-bold">تعداد:</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 rounded-lg w-full mt-2"
          />
        </div>

        {/* پرداخت */}

        <div className="mt-4 border rounded-lg p-3">
          <p className="font-bold mb-2">نحوه پرداخت:</p>

          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="border p-2 rounded-lg w-full"
          >
            <option value="cash">💵 نقدی</option>

            <option value="check">📝 چکی ۳ ماهه</option>
          </select>
        </div>

        <div className="bg-gray-100 rounded-lg p-3 mt-4">
          <p className="font-bold">
            تعداد نهایی:
            {finalCount()} عدد
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-black text-white text-center px-4 py-3 rounded-lg"
          >
            مشاهده
          </Link>

          <button
            onClick={handleAddCart}
            className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg"
          >
            🛒 افزودن
          </button>
        </div>

        {added && (
          <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center font-bold">
            ✅ به سبد خرید اضافه شد
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
