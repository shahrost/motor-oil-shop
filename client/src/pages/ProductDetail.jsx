import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <h1 className="text-center p-10 text-3xl font-bold">محصول پیدا نشد</h1>
    );
  }

  const relatedProducts = products.filter(
  (item) =>
    item.viscosity === product.viscosity &&
    item.id !== product.id
);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/products"
          className="inline-block mb-5 text-blue-600 font-bold"
        >
          ← بازگشت به محصولات
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* تصویر */}
            <div className="flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain"
              />
            </div>

            {/* اطلاعات */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.name}
              </h1>

              <p className="mt-4 text-gray-600 leading-8">
                {product.description}
              </p>

              <div className="mt-6 border rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 p-3 border-b">
                  <span className="font-bold">برند</span>
                  <span>{product.brand}</span>
                </div>

                <div className="grid grid-cols-2 p-3 border-b">
                  <span className="font-bold">حجم</span>
                  <span>{product.volume}</span>
                </div>

                <div className="grid grid-cols-2 p-3 border-b">
                  <span className="font-bold">گرید</span>
                  <span>{product.viscosity}</span>
                </div>

                <div className="grid grid-cols-2 p-3">
                  <span className="font-bold">دسته</span>
                  <span>{product.category}</span>
                </div>
              </div>

              <p className="text-3xl font-bold text-yellow-600 mt-6">
                {product.price}
              </p>

              <a
                href={`https://wa.me/989198334264?text=سلام، برای خرید ${product.name} با قیمت ${product.price} راهنمایی می‌خواهم`}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl mt-6"
              >
                سفارش در واتساپ
              </a>
            </div>
          </div>
        </div>

        {/* محصولات مشابه */}

        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">محصولات مشابه</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
