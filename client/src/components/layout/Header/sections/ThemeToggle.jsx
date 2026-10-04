import { useContext } from "react";

import ThemeContext from "../../../../context/ThemeContext";

// دکمه‌ی آیکونی تغییر حالت روز/شب با انیمیشن چرخش ماه و خورشید
function ThemeToggle({ t }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
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
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      >
        🌙
      </span>

      <span
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      >
        ☀️
      </span>
    </button>
  );
}

export default ThemeToggle;
