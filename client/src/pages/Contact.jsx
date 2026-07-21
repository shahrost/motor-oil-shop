function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          تماس با ما
        </h1>

        <p className="text-center text-gray-600 mt-5 leading-8">
          برای سفارش محصولات و دریافت قیمت همکاری و مشاوره خرید با ما در ارتباط
          باشید.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-black text-xl font-bold">شماره تماس</h2>

            <a
              href="tel:09198334264"
              className="block mt-3 text-blue-600 font-bold"
            >
              📞09198334264
            </a>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 overflow-hidden">
            <h2 className="text-black text-xl font-bold">واتساپ</h2>

            <a
              href="https://wa.me/989198334264"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 bg-green-600 text-white px-6 py-2 rounded-3xl"
            >
              ارسال پیام در واتساپ
            </a>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 overflow-hidden">
            <h2 className="text-black text-xl font-bold">محدوده فعالیت</h2>

            <p className="mt-3 text-gray-600 wrap-break-wordbreak-words leading-8 ">
              سبزدشت،گلستان،بهارستان،پرند ، رباط‌کریم ، نسیم‌شهر،
              نصیرشهر،خیرآباد،همدانک،اورین،آدران،صباشهر،شاهدشهر،کهنز،جاده
              آدران،الارد
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 overflow-hidden">
            <h2 className="text-black text-xl font-bold">همکاری فروش</h2>

            <p className="mt-3 text-gray-600">
              برای دریافت قیمت و شرایط فروش با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
