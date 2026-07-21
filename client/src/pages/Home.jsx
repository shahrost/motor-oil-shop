import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-black text-white p-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">فروش روغن موتور سمن</h1>

        <p className="text-lg md:text-xl mt-5">
          تامین روغن موتور با کیفیت برای فروشگاه‌ها و تعویض روغنی‌ها
        </p>

        <Link
          to="/products"
          className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg mt-8 font-bold"
        >
          مشاهده محصولات
        </Link>
      </section>

      <section className="p-10">
        <h2 className="text-3xl font-bold text-center">محصولات پرفروش</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
