import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain hover:scale-105 transition"
      />


      <h2 className="text-xl font-bold text-gray-800 mt-4">
        {product.name}
      </h2>


      <p className="text-gray-600 mt-3 line-clamp-2">
        {product.description}
      </p>


      <p className="text-yellow-600 font-bold text-lg mt-3">
        {product.price}
      </p>



      <div className="flex gap-3 mt-5">


        <Link
          to={`/product/${product.id}`}
          className="flex-1 text-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          مشاهده
        </Link>



        <a
          href="https://wa.me/989198334264"
          target="_blank"
          rel="noreferrer"
          className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          سفارش
        </a>


      </div>


    </div>
  );
}

export default ProductCard;