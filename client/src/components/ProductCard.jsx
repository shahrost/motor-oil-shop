import { Link } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="p-5">
        <img
          src={product.image}
          alt={product.name || "محصول روغن"}
          className="w-full h-52 object-contain hover:scale-105 transition duration-300"
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

        <h2 className="text-xl font-bold text-gray-800 mt-5">
          {product.name || `${product.brand || ""} ${product.viscosity || ""}`}
        </h2>

        <div className="mt-4 space-y-2 text-gray-600">
          {product.brand && (
            <p>
              <span className="font-bold text-gray-800">برند:</span>{" "}
              {product.brand}
            </p>
          )}

          {product.viscosity && (
            <p>
              <span className="font-bold text-gray-800">گرید:</span>{" "}
              {product.viscosity}
            </p>
          )}

          {product.api && (
            <p>
              <span className="font-bold text-gray-800">API:</span>{" "}
              {product.api}
            </p>
          )}

          {product.volume && (
            <p>
              <span className="font-bold text-gray-800">حجم:</span>{" "}
              {product.volume}
            </p>
          )}
        </div>

        <p className="text-gray-600 mt-4 line-clamp-2">
          {product.description || "بدون توضیحات"}
        </p>

        {product.price && (
          <p className="text-yellow-600 font-bold text-xl mt-4">
            {formatPrice(product.price)}
          </p>
        )}

        <p className="text-green-600 font-bold mt-3">🟢 آماده سفارش</p>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            مشاهده
          </Link>

          <a
            href={`tel:09198334264`}
            className="flex-1 text-center bg-green-600 text-white px-4 py-3 rounded-lg"
          >
            تماس برای سفارش
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
