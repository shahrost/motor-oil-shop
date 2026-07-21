function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">


        <h1 className="text-4xl font-bold text-center text-gray-800">
          درباره ما
        </h1>


        <p className="mt-8 text-lg text-gray-700 leading-9">
          مجموعه روغن موتور شهرام با هدف تامین و عرضه روغن موتورهای
          با کیفیت سمن، فعالیت خود را در زمینه فروش و پخش محصولات
          روغن موتور آغاز کرده است.
        </p>


        <p className="mt-5 text-lg text-gray-700 leading-9">
          ما با همکاری فروشگاه‌های لوازم یدکی و تعویض روغنی‌ها،
          تلاش می‌کنیم محصولات مورد نیاز مشتریان را با قیمت مناسب،
          پشتیبانی مناسب و ارسال سریع تامین کنیم.
        </p>



        <div className="mt-8 grid md:grid-cols-3 gap-5">


          <div className="bg-gray-100 rounded-lg p-5">
            <h2 className="font-bold text-xl">
              کیفیت
            </h2>

            <p className="mt-2 text-gray-600">
              ارائه محصولات استاندارد و مناسب خودروهای مختلف
            </p>
          </div>



          <div className="bg-gray-100 rounded-lg p-5">
            <h2 className="font-bold text-xl">
              همکاری
            </h2>

            <p className="mt-2 text-gray-600">
              همکاری مستقیم با فروشگاه‌ها و تعویض روغنی‌ها
            </p>
          </div>



          <div className="bg-gray-100 rounded-lg p-5">
            <h2 className="font-bold text-xl">
              پشتیبانی
            </h2>

            <p className="mt-2 text-gray-600">
              پاسخگویی و راهنمایی قبل و بعد از خرید
            </p>
          </div>


        </div>


      </div>

    </div>
  );
}

export default About;