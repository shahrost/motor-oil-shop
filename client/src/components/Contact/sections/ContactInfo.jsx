function ContactInfo() {
  return (
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

        <p className="mt-3">
          سبزدشت، گلستان، بهارستان، پرند، رباط‌کریم، نسیم‌شهر، نصیرشهر، خیرآباد،
          همدانک، اورین، آدران، صباشهر، شاهدشهر، کهنز، جاده آدران، الارد
        </p>
      </div>
    </div>
  );
}

export default ContactInfo;
