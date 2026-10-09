import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../../context/LanguageContext";
import menu from "../../../../data/menu";
import useMobileMenu from "../hooks/useMobileMenu";
import useAccountLink from "../hooks/useAccountLink";
import LanguageSwitch from "./LanguageSwitch";
import MobileCategoryList from "./MobileCategoryList";

const LINK_CLASS = "text-gray-200 hover:text-yellow-400";

// زیرمنوی هر آیتمی که داره (کلید منو ← کامپوننت زیرمنو)
const SUBMENUS = { products: MobileCategoryList };

// منوی کشویی موبایل/تبلت؛ با انتخاب هر لینک بسته می‌شه
function MobileMenu({ onClose }) {
  const { t } = useContext(LanguageContext);
  const { isOpen, toggleSubmenu, cartCount, isDark, toggleTheme } = useMobileMenu();
  const account = useAccountLink();

  return (
    <div className="lg:hidden bg-gray-900 rounded-2xl p-5 mb-4">
      <ul className="flex flex-col gap-4 text-center font-bold">
        {menu.map((item) => {
          const Submenu = SUBMENUS[item.key];

          return (
            <li key={item.path}>
              <div className="flex items-center justify-center gap-2">
                <Link to={item.path} onClick={onClose} className={LINK_CLASS}>
                  {t(`nav.${item.key}`)}
                </Link>

                {Submenu && (
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.key)}
                    aria-label={t(`nav.${item.key}`)}
                    className="text-gray-400"
                  >
                    {isOpen(item.key) ? "▴" : "▾"}
                  </button>
                )}
              </div>

              {Submenu && isOpen(item.key) && <Submenu onSelect={onClose} />}
            </li>
          );
        })}

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
            to={account.to}
            onClick={onClose}
            className="block bg-gray-800 text-white py-3 rounded-xl"
          >
            👤 {account.firstName || t("header.register")}
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full bg-gray-800 text-gray-200 py-3 rounded-xl"
          >
            {isDark ? `☀️ ${t("header.lightMode")}` : `🌙 ${t("header.darkMode")}`}
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
