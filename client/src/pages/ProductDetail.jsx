import { useParams } from "react-router-dom";
import { useContext, useState } from "react";

import ProductContext from "../context/ProductContext";
import CartContext from "../context/CartContext";
import formatPrice from "../utils/formatPrice";

function ProductDetail() {
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const { addToCart } = useContext(CartContext);

  const product = products.find(
    (item) => item.id === Number(id) || item.id === id,
  );

  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState("number");
  const [paymentType, setPaymentType] = useState("cash");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="p-10 text-center font-bold text-xl">محصول پیدا نشد</div>
    );
  }

  function finalCount() {
    if (orderType === "carton") {
      return Number(quantity) * Number(product.cartonCount || 1);
    }

    return Number(quantity);
  }

  function handleCart() {
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
    <div className="min-h-screen bg-gray-100 p-5 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-5 md:p-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* عکس */}

          <div>
            <div className="bg-gray-50 rounded-3xl p-5 flex items-center justify-center">
              <img
                src={product.image?.main || ""}
                alt={product.name}
                className="w-full h-80 object-contain hover:scale-105 transition"
              />
            </div>

            {product.image?.gallery?.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {product.image.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-24 h-24 object-contain border rounded-xl cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات */}

          <div>
            <h1 className="text-3xl font-extrabold text-black">
              {product.name}
            </h1>

            <div className="mt-6 space-y-3 text-black">
              <p>
                <b className="text-green-700">برند:</b> {product.brand}
              </p>

              <p>
                <b className="text-green-700">گرید:</b> {product.viscosity}
              </p>

              <p>
                <b className="text-green-700">حجم:</b> {product.volume}
              </p>
              <p>
                <b className="text-green-700">API:</b> {product.api}
              </p>

              <p>
                <b className="text-green-700">ACEA:</b> {product.acea}
              </p>

              <p>
                <b className="text-green-700">نوع روغن:</b> {product.oilType}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-4xl font-extrabold text-green-700">
                {formatPrice(product.price)}
              </p>

              <span className="inline-block mt-3 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
                🟢 موجود
              </span>
            </div>
            {product.description && (
              <div className="mt-6 bg-gray-50 rounded-2xl p-5">
                <h3 className="font-bold text-lg mb-3">توضیحات محصول</h3>

                <p className="leading-8 text-gray-700 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* خرید */}

            <div className="mt-8 bg-gray-50 rounded-2xl p-5">
              <label className="font-bold block mb-2">واحد خرید</label>

              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="number">عدد</option>

                <option value="carton">کارتن</option>
              </select>
            </div>

            <div className="mt-5 bg-gray-50 rounded-2xl p-5">
              <label className="font-bold block mb-2">تعداد</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="mt-5 bg-gray-50 rounded-2xl p-5">
              <label className="font-bold block mb-2">پرداخت</label>

              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option value="cash">💵 نقدی</option>

                <option value="check">📝 اعتباری </option>
              </select>
            </div>

            <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="font-bold text-green-700">تعداد نهایی:</p>

              <p className="text-3xl font-extrabold mt-2">{finalCount()} عدد</p>
            </div>

            <button
              onClick={handleCart}
              className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition"
            >
              🛒 افزودن به سبد خرید
            </button>

            {added && (
              <div className="mt-5 bg-green-600 text-white p-4 rounded-xl text-center font-bold">
                ✅ به سبد خرید اضافه شد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
