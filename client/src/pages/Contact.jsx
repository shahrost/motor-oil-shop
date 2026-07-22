import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          تماس با ما
        </h1>

        <p className="text-center mt-5 text-gray-700 text-lg">
          برای دریافت قیمت روز، مشاوره انتخاب روغن و ثبت سفارش با ما در ارتباط
          باشید.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">واتساپ سفارش</h2>

            <p className="mt-3">پاسخگویی سریع و دریافت لیست قیمت</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">همکاری فروش</h2>

            <p className="mt-3">ویژه لوازم یدکی‌ها و تعویض روغنی‌ها</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">محدوده فعالیت</h2>

            <p className="mt-3"> سبزدشت،گلستان،بهارستان،پرند ، رباط‌کریم ، نسیم‌شهر،
            نصیرشهر،خیرآباد،همدانک،اورین،آدران،صباشهر،شاهدشهر،کهنز،جاده
            آدران،الارد</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold"
          >
            پیام در واتساپ
          </a>

          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold mr-4"
          >
            مشاهده محصولات
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;
