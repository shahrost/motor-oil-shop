import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../../../context/CartContext";
import CustomerAuthContext from "../../../../context/CustomerAuthContext";
import ThemeContext from "../../../../context/ThemeContext";
import menu from "../../../../data/menu";
import menuCategories from "../../../../data/menuCategories";
import LanguageSwitch from "./LanguageSwitch";

const LINK_CLASS = "text-gray-200 hover:text-yellow-400";

// منوی کشویی موبایل/تبلت؛ با انتخاب هر لینک بسته می‌شه
function MobileMenu({ t, language, onClose }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const { cartCount } = useContext(CartContext);
  const { customer } = useContext(CustomerAuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="lg:hidden bg-gray-900 rounded-2xl p-5 mb-4">
      <ul className="flex flex-col gap-4 text-center font-bold">
        {menu.map((item) =>
          item.key === "products" ? (
            <li key={item.path}>
              <div className="flex items-center justify-center gap-2">
                <Link to={item.path} onClick={onClose} className={LINK_CLASS}>
                  {t(`nav.${item.key}`)}
                </Link>

                <button
                  type="button"
                  onClick={() => setCategoriesOpen((v) => !v)}
                  aria-label={t(`nav.${item.key}`)}
                  className="text-gray-400"
                >
                  {categoriesOpen ? "▴" : "▾"}
                </button>
              </div>

              {categoriesOpen && (
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {menuCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        to={`/category/${category.slug}`}
                        onClick={onClose}
                        className="block text-sm text-gray-300 hover:text-yellow-400 bg-gray-800 rounded-lg py-2"
                      >
                        {language === "en" ? category.labelEn : category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.path}>
              <Link to={item.path} onClick={onClose} className={LINK_CLASS}>
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          ),
        )}

        <li>
          <Link
            to="/cart"
            onClick={onClose}
            className="block bg-yellow-400 text-black py-3 rounded-xl"
          >
            🛒 {t("header.cartLabel")} ({cartCount})
          </Link>
        </li>

        <li>
          <Link
            to={customer ? "/account" : "/register"}
            onClick={onClose}
            className="block bg-gray-800 text-white py-3 rounded-xl"
          >
            👤 {customer ? customer.name.split(" ")[0] : t("header.register")}
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full bg-gray-800 text-gray-200 py-3 rounded-xl"
          >
            {theme === "dark"
              ? `☀️ ${t("header.lightMode")}`
              : `🌙 ${t("header.darkMode")}`}
          </button>
        </li>

        <li>
          <LanguageSwitch />
        </li>
      </ul>
    </div>
  );
}

export default MobileMenu;
