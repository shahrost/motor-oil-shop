// import { useParams, Link } from "react-router-dom";
// import { useContext } from "react";
// import ProductContext from "../context/ProductContext";
// import ProductCard from "../components/ProductCard";
// import OrderButtons from "../components/OrderButtons";
// import formatPrice from "../utils/formatPrice";

// function ProductDetail() {
//   const { id } = useParams();

//   const { products } = useContext(ProductContext);

//   const product = products.find((item) => item.id === Number(id));

//   if (!product) {
//     return (
//       <h1 className="text-center p-10 text-3xl font-bold">محصول پیدا نشد</h1>
//     );
//   }

//   const relatedProducts = products.filter(
//     (item) => item.viscosity === product.viscosity && item.id !== product.id,
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
//       <div className="max-w-6xl mx-auto">
//         <Link
//           to="/products"
//           className="inline-block mb-5 text-blue-600 font-bold"
//         >
//           ← بازگشت به محصولات
//         </Link>

//         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
//           <div className="grid md:grid-cols-2 gap-10">
//             <div className="flex justify-center items-center">
//               <img
//                 src={product.image}
//                 alt={product.name || "محصول"}
//                 className="w-full h-96 object-contain"
//               />
//             </div>

//             <div>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {product.isNew && (
//                   <span className="bg-blue-500 text-white px-3 py-1 rounded">
//                     🆕 محصول جدید
//                   </span>
//                 )}

//                 {product.isBestSeller && (
//                   <span className="bg-red-500 text-white px-3 py-1 rounded">
//                     🔥 پرفروش
//                   </span>
//                 )}

//                 {product.isSpecial && (
//                   <span className="bg-yellow-400 px-3 py-1 rounded">
//                     ⭐ پیشنهاد ویژه
//                   </span>
//                 )}
//               </div>

//               <h1 className="text-3xl font-bold text-gray-800">
//                 {product.name ||
//                   `${product.brand || ""} ${product.viscosity || ""}`}
//               </h1>

//               <p className="mt-4 text-gray-600 leading-8">
//                 {product.description || "بدون توضیحات"}
//               </p>

//               <div className="mt-6 border rounded-xl overflow-hidden">
//                 {product.brand && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">برند</span>

//                     <span>{product.brand}</span>
//                   </div>
//                 )}

//                 {product.volume && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">حجم</span>

//                     <span>{product.volume}</span>
//                   </div>
//                 )}

//                 {product.viscosity && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">گرید</span>

//                     <span>{product.viscosity}</span>
//                   </div>
//                 )}

//                 {product.api && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">API</span>

//                     <span>{product.api}</span>
//                   </div>
//                 )}

//                 {product.acea && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">ACEA</span>

//                     <span>{product.acea}</span>
//                   </div>
//                 )}

//                 {product.oilType && (
//                   <div className="grid grid-cols-2 p-3 border-b">
//                     <span className="font-bold">نوع محصول</span>

//                     <span>{product.oilType}</span>
//                   </div>
//                 )}

//                 {product.vehicles?.length > 0 && (
//                   <div className="p-3">
//                     <span className="font-bold">خودروهای مناسب:</span>

//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {product.vehicles.map((car) => (
//                         <span
//                           key={car}
//                           className="bg-gray-200 px-3 py-1 rounded"
//                         >
//                           {car}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {product.price && (
//                 <p className="text-3xl font-bold text-yellow-600 mt-6">
//                   {formatPrice(product.price)}
//                 </p>
//               )}

//               <OrderButtons product={product} />
//             </div>
//           </div>
//         </div>

//         {relatedProducts.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-3xl font-bold mb-5">محصولات مشابه</h2>

//             <div className="grid md:grid-cols-3 gap-6">
//               {relatedProducts.map((item) => (
//                 <ProductCard key={item.id} product={item} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
//-----------------------------------------
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

          <div className="bg-gray-50 rounded-3xl p-5 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain hover:scale-105 transition"
            />
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
            </div>

            <div className="mt-6">
              <p className="text-4xl font-extrabold text-green-700">
                {formatPrice(product.price)}
              </p>

              <span className="inline-block mt-3 bg-green-100 text-green-700 px-5 py-2 rounded-full font-bold">
                🟢 موجود
              </span>
            </div>

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
