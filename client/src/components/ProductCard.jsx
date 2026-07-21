import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain"
      />
      <h2 className="text-xl font-bold">{product.name}</h2>

      <p className="text-gray-600 mt-3">{product.description}</p>

      <p className="text-yellow-600 font-bold mt-3">{product.price}</p>

      <Link
        to={`/product/${product.id}`}
        className="inline-block bg-black text-white px-5 py-2 rounded-lg mt-4"
      >
        مشاهده محصول
      </Link>
    </div>
  );
}

export default ProductCard;
