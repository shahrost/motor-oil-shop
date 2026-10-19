import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import useFavoriteButton from "./hooks/useFavoriteButton";

const SIZES = {
  sm: "w-8 h-8",
  lg: "w-11 h-11",
};

const ICON_SIZES = {
  sm: "w-4 h-4",
  lg: "w-6 h-6",
};

// دکمه‌ی قلب «افزودن به علاقه‌مندی‌ها»؛ جاش رو والد با className تعیین می‌کنه
function FavoriteButton({ productId, size = "sm", className = "" }) {
  const { t } = useContext(LanguageContext);
  const { active, onClick } = useFavoriteButton(productId);
  const label = t(active ? "favorites.remove" : "favorites.add");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={`z-1 flex items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-gray-200 hover:scale-110 transition ${SIZES[size]} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`${ICON_SIZES[size]} ${active ? "text-red-600" : "text-gray-500"}`}
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.4h2c.7-1.2 2.2-2.4 4.3-2.4 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}

export default FavoriteButton;
