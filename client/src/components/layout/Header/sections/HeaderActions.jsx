import { useContext } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../../../context/CartContext";
import CustomerAuthContext from "../../../../context/CustomerAuthContext";
import { WHATSAPP_URL, PHONE_URL } from "../../../../data/contact";
import whatsappLogo from "../../../../assets/social/whatsapp.svg";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

const SUBTLE_BUTTON = "bg-white/10 hover:bg-white/20 ring-1 ring-white/15 text-white";

// دکمه‌های سمت چپ هدر: زبان، تم، حساب، سبد خرید، واتس‌اپ، تماس و دکمه‌ی منوی موبایل
function HeaderActions({ t, menuOpen, onToggleMenu }) {
  const { cartCount } = useContext(CartContext);
  const { customer } = useContext(CustomerAuthContext);

  return (
    <div className="flex items-center gap-2">
      <LanguageSwitch compact />

      <ThemeToggle t={t} />

      <Link
        to={customer ? "/account" : "/register"}
        title={customer ? customer.name : t("header.register")}
        className={`hidden sm:flex items-center justify-center ${SUBTLE_BUTTON} w-11 h-11 rounded-xl font-bold text-[11px] leading-tight text-center px-1 truncate transition`}
      >
        {customer ? `👤 ${customer.name.split(" ")[0]}` : t("header.register")}
      </Link>

      <Link
        to="/cart"
        className="relative flex items-center justify-center bg-yellow-400 text-black w-11 h-11 rounded-xl font-bold hover:bg-yellow-300 transition"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-2 -left-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex items-center justify-center bg-green-600 hover:bg-green-700 text-white w-11 h-11 rounded-xl font-bold"
      >
        <img src={whatsappLogo} alt={t("header.whatsapp")} className="w-6 h-6" />
      </a>

      <a
        href={PHONE_URL}
        className={`hidden md:flex items-center justify-center ${SUBTLE_BUTTON} w-11 h-11 rounded-xl font-bold`}
      >
        📞
      </a>

      <button
        type="button"
        onClick={onToggleMenu}
        className="lg:hidden text-white text-3xl"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </div>
  );
}

export default HeaderActions;
