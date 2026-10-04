import { useContext, useEffect, useState } from "react";
import LanguageContext from "../../../context/LanguageContext";

const SHOW_AFTER_PX = 500;

// دکمه‌ی «برگشت به بالا»؛ بعد از کمی اسکرول ظاهر می‌شه
function ScrollTopButton() {
  const { t } = useContext(LanguageContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > SHOW_AFTER_PX);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 bg-black text-white w-12 h-12 rounded-full shadow-xl text-xl"
      aria-label={t("products.scrollTop")}
    >
      ↑
    </button>
  );
}

export default ScrollTopButton;
