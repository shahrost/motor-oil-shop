import { useContext, useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import LanguageContext from "../../../context/LanguageContext";

// فقط بعد از اسکرول قابل‌توجه (حدود دو صفحه) ظاهر می‌شه
const SHOW_AFTER_SCREENS = 2;

// دکمه‌ی «برگشت به بالا»؛ روی موبایل کوچیک‌تره و فاصله‌ی امن پایین گوشی (safe-area) رو رعایت می‌کنه
function ScrollTopButton() {
  const { t } = useContext(LanguageContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > window.innerHeight * SHOW_AFTER_SCREENS);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-6 z-40 bg-black/80 sm:bg-black text-white w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-xl flex items-center justify-center"
      aria-label={t("products.scrollTop")}
    >
      <ArrowUp size={18} className="sm:size-5" />
    </button>
  );
}

export default ScrollTopButton;
