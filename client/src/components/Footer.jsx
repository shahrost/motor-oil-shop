import { Link } from "react-router-dom";
import logo from "../assets/logo/1784245046047.jpg";

function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* لوگو */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="روغن موتور شهرام"
                className="w-14 h-14 object-contain"
              />

              <h2 className="text-2xl font-bold text-yellow-400">
                روغن موتور شهرام
              </h2>
            </div>

            <p className="mt-4 text-gray-300 leading-8">
              تامین کننده روغن موتور سمن و سایر برندهای معتبر ویژه فروشگاه‌های
              لوازم یدکی و تعویض روغنی‌ها.
            </p>
          </div>

          {/* لینک‌ها */}
          <div>
            <h3 className="text-xl font-bold mb-4">دسترسی سریع</h3>

            <ul className="space-y-3">
              <li>
                <Link to="/">خانه</Link>
              </li>

              <li>
                <Link to="/products">محصولات</Link>
              </li>

              <li>
                <Link to="/brands">برندها</Link>
              </li>

              <li>
                <Link to="/viscosity">گرید روغن</Link>
              </li>

              <li>
                <Link to="/contact">تماس با ما</Link>
              </li>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h3 className="text-xl font-bold mb-4">ارتباط با ما</h3>

            <p className="mb-3">
              📍 سبزدشت،گلستان،بهارستان،پرند ، رباط‌کریم ، نسیم‌شهر،
              نصیرشهر،خیرآباد،همدانک،اورین،آدران،صباشهر،شاهدشهر،کهنز،جاده
              آدران،الارد
            </p>

            <p className="mb-3">📱 واتساپ:</p>

            <a
              href="https://wa.me/989198334264"
              target="_blank"
              rel="noreferrer"
              className="text-green-400 font-bold hover:text-green-300"
            >
              09198334264
            </a>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-400">
          © 2026 روغن موتور شهرام | تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
