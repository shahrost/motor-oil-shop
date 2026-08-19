function SalesBanner() {
  return (
    <section className="px-5 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="bg-yellow-400 rounded-3xl p-8 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            همکاری و خرید عمده
          </h2>

          <p className="mt-4 text-gray-800 leading-8">
            برای دریافت قیمت روز، شرایط همکاری و ثبت سفارش عمده با ما در ارتباط
            باشید.
          </p>

          <a
            href="https://wa.me/989198334264"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition"
          >
            درخواست همکاری در واتساپ
          </a>
        </div>
      </div>
    </section>
  );
}

export default SalesBanner;
