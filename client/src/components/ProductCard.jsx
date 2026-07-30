import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import formatPrice from "../utils/formatPrice";
import CartContext from "../context/CartContext";

import paymentTypes from "../data/paymentTypes";
import orderUnits from "../data/orderUnits";

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

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-200
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      overflow-hidden
      "
    >
      <div className="p-4">
        <div className="rounded-2xl overflow-hidden bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="
            w-full
            h-52
            object-contain
            hover:scale-105
            transition
            duration-500
            "
          />
        </div>

        <h2
          className="
          text-lg
          font-extrabold
          mt-4
          text-gray-900
          "
        >
          {product.name}
        </h2>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-bold text-green-700">برند:</span>{" "}
            {product.brand}
          </p>

          <p>
            <span className="font-bold text-green-700">گرید:</span>{" "}
            {product.viscosity}
          </p>

          <p>
            <span className="font-bold text-green-700">حجم:</span>{" "}
            {product.volume}
          </p>

          <p>
            <span className="font-bold text-green-700">تعداد در کارتن:</span>{" "}
            {product.cartonCount || "-"} عدد
          </p>
        </div>

        <div className="mt-5">
          <p
            className="
            text-xl
            font-extrabold
            text-green-700
            "
          >
            {formatPrice(product.price)}
          </p>

          <p className="text-xs text-gray-500">قیمت هر عدد</p>
        </div>

        <div
          className="
          mt-5
          grid
          grid-cols-3
          gap-2
          "
        >
          <div>
            <label className="text-xs font-bold block mb-1">واحد خرید</label>

            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="
              w-full
              h-10
              border
              rounded-lg
              px-2
              text-sm
              bg-white
              "
            >
              {orderUnits.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">تعداد</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="
              w-full
              h-10
              border
              rounded-lg
              px-2
              text-sm
              "
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">پرداخت</label>

            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="
              w-full
              h-10
              border
              rounded-lg
              px-2
              text-sm
              "
            >
              {paymentTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.icon} {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="
          flex
          justify-center
          gap-2
          mt-4
          "
        >
          <Link
            to={`/product/${product.id}`}
            className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            text-xs
            font-bold
            "
          >
            مشاهده
          </Link>

          <button
            onClick={handleAddCart}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-4
            py-2
            rounded-lg
            text-xs
            font-bold
            "
          >
            🛒 افزودن
          </button>
        </div>

        {added && (
          <div
            className="
            mt-4
            bg-green-600
            text-white
            rounded-lg
            p-2
            text-center
            text-sm
            font-bold
            "
          >
            ✅ به سبد خرید اضافه شد
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
