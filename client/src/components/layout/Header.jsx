import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import CustomerAuthContext from "../../context/CustomerAuthContext";
import ThemeContext from "../../context/ThemeContext";
import LanguageContext from "../../context/LanguageContext";
import menu from "../../data/menu";
import ownerPhoto from "../../assets/logo/shahram-logo.png";
import brandLogo from "../../assets/logo/shahram-monogram-yellow.svg";
import whatsappLogo from "../../assets/social/whatsapp.svg";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  const { cartCount } = useContext(CartContext);
  const { customer } = useContext(CustomerAuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, t } = useContext(LanguageContext);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!photoOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") setPhotoOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoOpen]);

  return (
    <header
      className="
      bg-gray-950
      sticky top-0
      z-50
      shadow-lg
      border-b
      border-gray-800
      "
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div
          className="
        h-20
        flex
        items-center
        justify-between
        "
        >
          {/* BRAND */}

          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <Link to="/" aria-label={t("nav.home")}>
                <img
                  src={brandLogo}
                  alt="شهرام روغن"
                  className="h-8 md:h-9 w-auto select-none"
                  draggable="false"
                />
              </Link>

              <button
                type="button"
                onClick={() => setPhotoOpen(true)}
                aria-label={t("header.showPhoto")}
                className="
                hidden
                sm:flex
                absolute
                -bottom-1.5
                -right-1.5
                w-6
                h-6
                rounded-full
                ring-2
                ring-gray-950
                overflow-hidden
                shadow
                cursor-zoom-in
                "
              >
                <img
                  src={ownerPhoto}
                  alt="شهرام"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 12%" }}
                />
              </button>
            </div>

            <Link to="/" className="leading-tight">
              <h1
                className="
                text-yellow-400
                text-lg
                sm:text-xl
                md:text-2xl
                font-black
                "
              >
                شهرام روغن
              </h1>

              <p className="hidden sm:block text-gray-400 text-xs">
                shahram_roghan
              </p>
            </Link>
          </div>

          {/* MENU */}

          <nav className="hidden lg:flex items-center gap-6">
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="
      font-bold
      text-gray-200
      hover:text-yellow-400
      transition
      "
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            <div
              className="
              flex
              items-center
              bg-gray-800
              rounded-xl
              p-1
              text-xs
              font-bold
              "
            >
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  language === "en"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setLanguage("fa")}
                className={`px-2.5 py-1.5 rounded-lg transition ${
                  language === "fa"
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                FA
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t("header.toggleTheme")}
              className="
              relative
              w-10
              h-10
              rounded-xl
              bg-gray-800
              hover:bg-gray-700
              text-xl
              flex
              items-center
              justify-center
              transition
              "
            >
              <span
                className={`
                absolute
                transition-all
                duration-300
                ${theme === "dark" ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
                `}
              >
                🌙
              </span>

              <span
                className={`
                absolute
                transition-all
                duration-300
                ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}
                `}
              >
                ☀️
              </span>
            </button>

            <Link
              to={customer ? "/account" : "/register"}
              className="
              hidden
              sm:flex
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-4
              py-2.5
              rounded-xl
              font-bold
              transition
              "
            >
              {customer
                ? `👤 ${customer.name.split(" ")[0]}`
                : t("header.register")}
            </Link>

            <Link
              to="/cart"
              className="
              relative
              bg-yellow-400
              text-black
              px-4
              py-2.5
              rounded-xl
              font-bold
              hover:bg-yellow-300
              transition
              "
            >
              🛒
              {cartCount > 0 && (
                <span
                  className="
                  absolute
                  -top-2
                  -left-2
                  bg-red-600
                  text-white
                  w-6
                  h-6
                  rounded-full
                  text-xs
                  flex
                  items-center
                  justify-center
                  "
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/989198334264"
              target="_blank"
              rel="noreferrer"
              className="
              hidden
              md:flex
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2.5
              rounded-xl
              font-bold
              items-center
              justify-center
              "
            >
              <img
                src={whatsappLogo}
                alt={t("header.whatsapp")}
                className="w-6 h-6"
              />
            </a>

            <a
              href="tel:09198334264"
              className="
              hidden
              md:flex
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2.5
              rounded-xl
              font-bold
              "
            >
              📞
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
              lg:hidden
              text-white
              text-3xl
              "
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="
            lg:hidden
            bg-gray-900
            rounded-2xl
            p-5
            mb-4
            "
          >
            <ul
              className="
            flex
            flex-col
            gap-4
            text-center
            font-bold
            "
            >
              {menu.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className="text-gray-200 hover:text-yellow-400"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  to="/cart"
                  onClick={closeMenu}
                  className="
                  block
                  bg-yellow-400
                  text-black
                  py-3
                  rounded-xl
                  "
                >
                  🛒 {t("header.cartLabel")} ({cartCount})
                </Link>
              </li>

              <li>
                <Link
                  to={customer ? "/account" : "/register"}
                  onClick={closeMenu}
                  className="
                  block
                  bg-indigo-600
                  text-white
                  py-3
                  rounded-xl
                  "
                >
                  👤{" "}
                  {customer
                    ? customer.name.split(" ")[0]
                    : t("header.register")}
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="
                  w-full
                  bg-gray-800
                  text-gray-200
                  py-3
                  rounded-xl
                  "
                >
                  {theme === "dark"
                    ? `☀️ ${t("header.lightMode")}`
                    : `🌙 ${t("header.darkMode")}`}
                </button>
              </li>

              <li>
                <div className="flex items-center justify-center gap-2 bg-gray-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`flex-1 py-2 rounded-lg transition ${
                      language === "en"
                        ? "bg-yellow-400 text-black"
                        : "text-gray-300"
                    }`}
                  >
                    EN
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage("fa")}
                    className={`flex-1 py-2 rounded-lg transition ${
                      language === "fa"
                        ? "bg-yellow-400 text-black"
                        : "text-gray-300"
                    }`}
                  >
                    FA
                  </button>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>

      {photoOpen && (
        <div
          onClick={() => setPhotoOpen(false)}
          className="
          fixed
          inset-0
          z-60
          bg-black/80
          flex
          items-center
          justify-center
          p-6
          "
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(false)}
            aria-label={t("header.close")}
            className="
            absolute
            top-5
            left-5
            text-white
            text-4xl
            leading-none
            "
          >
            ✕
          </button>

          <img
            src={ownerPhoto}
            alt="شهرام"
            onClick={(e) => e.stopPropagation()}
            className="
            max-h-[90vh]
            max-w-[90vw]
            object-contain
            rounded-2xl
            shadow-2xl
            "
          />
        </div>
      )}
    </header>
  );
}

export default Header;
