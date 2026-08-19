import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import menu from "../../data/menu";
import ownerPhoto from "../../assets/shahram-logo.png";
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  const { cartCount } = useContext(CartContext);

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
      dir="rtl"
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPhotoOpen(true)}
              aria-label="نمایش بزرگ عکس"
              className="
              w-12
              h-12
              rounded-xl
              bg-yellow-400
              overflow-hidden
              flex-shrink-0
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

            <Link to="/">
              <h1
                className="
                text-yellow-400
                text-xl
                md:text-2xl
                font-black
                "
              >
                شهرام روغن
              </h1>

              <p className="text-gray-400 text-xs">shahram_roghan</p>
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
                {item.title}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
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
              "
            >
              💬
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
                    {item.title}
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
                  🛒 سبد خرید ({cartCount})
                </Link>
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
            aria-label="بستن"
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
