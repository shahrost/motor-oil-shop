import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import ProductContext from "../context/ProductContext";

function Home() {
  const { products } = useContext(ProductContext);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section className="bg-black text-white p-10 md:p-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
          فروش روغن موتور سمن
        </h1>

        <p className="text-lg md:text-xl mt-5">
          تامین روغن موتور با کیفیت برای لوازم یدکی‌ها و تعویض روغنی‌ها
        </p>

        <Link
          to="/products"
          className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg mt-8 font-bold"
        >
          مشاهده محصولات
        </Link>
      </section>

      {/* مزیت ها */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center text-red-600">
          چرامشتریان ماراانتخاب میکنند؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">ارسال سریع</h3>

            <p className="mt-3">
              ارسال سفارشات برای فروشگاه‌ها و تعویض روغنی‌ها
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">فروش عمده</h3>

            <p className="mt-3">تامین محصولات برای همکاران و مراکز فروش</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">پشتیبانی واتساپ</h3>

            <p className="mt-3">ثبت سفارش سریع از طریق واتساپ</p>
          </div>
        </div>
      </section>

      {/* محصولات */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center">محصولات پرفروش</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="p-10 bg-white">
        <h2 className="text-3xl font-bold text-center">محدوده فعالیت</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
          <div className="bg-gray-100 p-5 rounded-xl">رباط کریم</div>

          <div className="bg-gray-100 p-5 rounded-xl">پرند</div>

          <div className="bg-gray-100 p-5 rounded-xl">نسیم شهر</div>

          <div className="bg-gray-100 p-5 rounded-xl">نصیرشهر</div>
        </div>
      </section>
      {/* واتساپ */}
      <section className="bg-green-600 text-white p-10 text-center">
        <h2 className="text-3xl font-bold">برای سفارش سریع پیام دهید</h2>

        <p className="mt-3">قیمت روز و شرایط همکاری را از واتساپ دریافت کنید</p>

        <a
          href="https://wa.me/989198334264"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white text-green-700 px-8 py-3 rounded-lg mt-6 font-bold"
        >
          سفارش واتساپ
        </a>
      </section>
    </div>
  );
}

export default Home;
