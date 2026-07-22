import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="p-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-contain hover:scale-105 transition duration-300"
        />

        <h2 className="text-xl font-bold text-gray-800 mt-5">{product.name}</h2>

        <div className="mt-4 space-y-2 text-gray-600">
          <p>
            <span className="font-bold text-gray-800">برند:</span>{" "}
            {product.brand}
          </p>

          <p>
            <span className="font-bold text-gray-800">گرید:</span>{" "}
            {product.viscosity}
          </p>

          <p>
            <span className="font-bold text-gray-800">حجم:</span>{" "}
            {product.volume}
          </p>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-2">{product.description}</p>

        <p className="text-yellow-600 font-bold text-xl mt-4">
          {product.price}
        </p>

        <div className="flex gap-3 mt-6">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            مشاهده
          </Link>

          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition"
          >
            سفارش
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
