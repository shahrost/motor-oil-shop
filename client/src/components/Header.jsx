import { Link } from "react-router-dom";
import  logo  from "../assets/logo/1784245046047.jpg";
function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-xl md:text-2xl font-bold text-yellow-400"
        >
          <img src={logo} alt="لوگو" className="w-30 h-30 object-contain" />

          <span>روغن موتور شهرام</span>
        </Link>

        {/* Menu */}
        <nav>
          <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <li>
              <Link to="/about">درباره ما</Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                تماس
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-yellow-400 transition">
                محصولات
              </Link>
            </li>
            <li>
  <Link
    to="/viscosity"
    className="hover:text-yellow-400 transition"
  >
    گرید روغن
  </Link>
</li>
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                خانه
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/989198334264"
                target="_blank"
                rel="noreferrer"
                className="
               bg-green-600
               hover:bg-green-700
                 px-3
                 py-2
                 md:px-4
                 rounded-lg
                 transition
                         "
              >
                واتساپ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
