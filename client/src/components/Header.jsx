import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo/1784245046047.jpg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive ? "text-yellow-400 font-bold" : "hover:text-yellow-400 transition";

  return (
    <header className="bg-black text-white shadow-lg" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-yellow-400"
          >
            <img
              src={logo}
              alt="روغن موتور شهرام"
              className="w-14 h-14 object-contain"
            />

            <span>روغن موتور شهرام</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <NavLink to="/" end className={navClass}>
                  خانه
                </NavLink>
              </li>

              <li>
                <NavLink to="/products" className={navClass}>
                  محصولات
                </NavLink>
              </li>

              <li>
                <NavLink to="/brands" className={navClass}>
                  برندها
                </NavLink>
              </li>

              <li>
                <NavLink to="/viscosity" className={navClass}>
                  گرید روغن
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={navClass}>
                  درباره ما
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={navClass}>
                  تماس
                </NavLink>
              </li>

              <li>
                <a
                  href="https://wa.me/989198334264"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                >
                  واتساپ
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-5 bg-gray-900 rounded-xl p-4">
            <ul className="flex flex-col gap-4 text-center">
              <li>
                <NavLink
                  to="/"
                  end
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  خانه
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  محصولات
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  برندها
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/viscosity"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  گرید روغن
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  درباره ما
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  تماس
                </NavLink>
              </li>

              <li>
                <a
                  href="https://wa.me/989198334264"
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-green-600 hover:bg-green-700 rounded-lg py-3 transition"
                >
                  واتساپ
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
