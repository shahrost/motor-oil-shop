import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import useCompatibleVehicles from "./hooks/useCompatibleVehicles";

// نام خودروهای سازگار با یک فیلتر (فقط نام‌ها). برای محصول بدون خودروی ثبت‌شده
// یا غیرفیلتر چیزی رندر نمی‌شه. اگه لیست از limit بلندتر باشه با «+N خودرو دیگر»
// جمع می‌شه و با کلیک کامل باز می‌شه.
function CompatibleVehicles({
  product,
  limit = 4,
  defaultOpen = false,
  compact = false,
  className = "",
}) {
  const { t } = useContext(LanguageContext);
  const { names, text, hiddenCount, collapsible, open, toggle } =
    useCompatibleVehicles(product, { limit, defaultOpen });

  if (!names.length) return null;

  const handleToggle = (event) => {
    // داخل کارت لینک‌دار کلیک نباید صفحه‌ی محصول رو باز کنه
    event.preventDefault();
    event.stopPropagation();
    toggle();
  };

  return (
    <div
      className={`${compact ? "text-xs" : "text-sm"} font-bold text-gray-700 ${className}`}
    >
      <p className="leading-6 break-words">{text}</p>

      {collapsible && (
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={open}
          className="mt-1 text-yellow-700 hover:text-yellow-800"
        >
          {open
            ? t("compatibleVehicles.less")
            : `+${hiddenCount} ${t("compatibleVehicles.more")}`}
        </button>
      )}
    </div>
  );
}

export default CompatibleVehicles;
