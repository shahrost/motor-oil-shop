import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          درباره روغن موتور شهرام
        </h1>

        <p className="mt-8 text-lg leading-9 text-gray-700 text-center">
          روغن موتور شهرام تامین کننده روغن موتورهای با کیفیت برای فروشگاه‌های
          لوازم یدکی، تعویض روغنی‌ها و مصرف‌کنندگان عزیز است. هدف ما ارائه
          محصولات مطمئن، قیمت مناسب و پشتیبانی سریع می‌باشد.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">تامین محصولات</h2>

            <p className="mt-3">
              ارائه روغن موتور سمن و محصولات مورد نیاز بازار خودرو
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">همکاری با همکاران</h2>

            <p className="mt-3">همکاری با لوازم یدکی‌ها و تعویض روغنی‌ها</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold">پشتیبانی سریع</h2>

            <p className="mt-3">دریافت قیمت روز و ثبت سفارش از طریق واتساپ</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">محدوده فعالیت</h2>

          <p className="mt-4 text-gray-700">
            سبزدشت،گلستان،بهارستان،پرند ، رباط‌کریم ، نسیم‌شهر،
            نصیرشهر،خیرآباد،همدانک،اورین،آدران،صباشهر،شاهدشهر،کهنز،جاده
            آدران،الارد{" "}
          </p>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold"
          >
            مشاهده محصولات
          </Link>

          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold mr-4"
          >
            سفارش واتساپ
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
