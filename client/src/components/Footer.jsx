function Footer() {
  return (
    <footer className="bg-black text-white mt-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="text-center">
          <h2 className="text-yellow-400 text-2xl md:text-3xl font-extrabold mb-4">
            شهرام روغن
          </h2>

          <p className="text-gray-300 leading-8 max-w-xl mx-auto">
            تامین و فروش انواع روغن موتور برای فروشگاه‌های لوازم یدکی، تعویض
            روغنی‌ها و مشتریان عمده.
          </p>

          <p className="text-gray-400 mt-3">shahram_roghan</p>
        </div>

        <div
          className="
          border-t
          border-gray-700
          mt-8
          pt-5
          text-center
          text-gray-400
          text-sm
        "
        >
          © {new Date().getFullYear()} شهرام روغن - تمامی حقوق محفوظ است
        </div>
      </div>
    </footer>
  );
}

export default Footer;
