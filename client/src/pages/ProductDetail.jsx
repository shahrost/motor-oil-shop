import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h1 className="text-center p-10 text-3xl">محصول پیدا نشد</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}

          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Info */}

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            <p className="text-gray-600 mt-4">{product.description}</p>

            <div className="mt-6 space-y-3">
              <p>
                <span className="font-bold">برند:</span> {product.brand}
              </p>

              <p>
                <span className="font-bold">حجم:</span> {product.volume}
              </p>

              <p>
                <span className="font-bold">گرید:</span> {product.viscosity}
              </p>

              <p>
                <span className="font-bold">دسته:</span> {product.category}
              </p>
            </div>

            <p className="text-yellow-600 font-bold text-2xl mt-6">
              {product.price}
            </p>

            <a
              href={`https://wa.me/989198334264?text=سلام، سفارش ${product.name} را دارم`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg mt-6 transition"
            >
              سفارش در واتساپ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
