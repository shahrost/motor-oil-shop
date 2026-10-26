import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";

import CartContext from "../../../../context/CartContext";
import LanguageContext from "../../../../context/LanguageContext";
import { WHATSAPP_URL, PHONE_URL } from "../../../../data/contact";
import whatsappLogo from "../../../../assets/social/whatsapp.svg";
import AccountMenu from "./AccountMenu";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

const SUBTLE_BUTTON = "bg-white/10 hover:bg-white/20 ring-1 ring-white/15 text-white";

// دکمه‌های سمت چپ هدر: زبان، تم، حساب، سبد خرید، واتس‌اپ، تماس و دکمه‌ی منوی موبایل.
// زیر sm زبان و تم فقط داخل منوی موبایل‌ان تا ردیف هدر در گوشی‌های ۳۲۰ تا ۳۷۵ پیکسلی جا بشه
function HeaderActions({ menuOpen, onToggleMenu }) {
  const { t } = useContext(LanguageContext);
  const { cartCount } = useContext(CartContext);

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:block">
        <LanguageSwitch compact />
      </div>

      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      <AccountMenu buttonClass={SUBTLE_BUTTON} />

      <Link
        to="/cart"
        aria-label={t("header.cartLabel")}
        className="relative flex items-center justify-center bg-yellow-400 text-black w-11 h-11 rounded-xl font-bold hover:bg-yellow-300 transition"
      >
        <ShoppingCart />
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
        aria-label={t("header.call")}
        className={`hidden md:flex items-center justify-center ${SUBTLE_BUTTON} w-11 h-11 rounded-xl font-bold`}
      >
        <Phone />
      </a>

      <button
        type="button"
        onClick={onToggleMenu}
        aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
        aria-expanded={menuOpen}
        className="xl:hidden text-white w-11 h-11 flex items-center justify-center"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
}

export default HeaderActions;
