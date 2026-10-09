import { useContext, useState } from "react";

import CartContext from "../../../../context/CartContext";
import ThemeContext from "../../../../context/ThemeContext";

// زیرمنوی باز در منوی موبایل (یکی در هر لحظه) + داده‌ی دکمه‌های پایین منو
function useMobileMenu() {
  const [openKey, setOpenKey] = useState(null);
  const { cartCount } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return {
    isOpen: (key) => openKey === key,
    toggleSubmenu: (key) => setOpenKey((current) => (current === key ? null : key)),
    cartCount,
    isDark: theme === "dark",
    toggleTheme,
  };
}

export default useMobileMenu;
