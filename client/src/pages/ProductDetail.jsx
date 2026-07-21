import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h1 className="text-center p-10 text-3xl">محصول پیدا نشد</h1>;
  }

  return (
    <div className="p-10">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain"
        />

        <h1 className="text-4xl font-bold mt-5">{product.name}</h1>

        <p className="text-gray-600 mt-3">{product.description}</p>

        <p className="text-yellow-600 font-bold text-2xl mt-5">
          {product.price}
        </p>

        <a
          href={`https://wa.me/989198334264?text=سلام، سفارش ${product.name} را دارم`}
          target="_blank"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg mt-5"
        >
          سفارش در واتساپ
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
