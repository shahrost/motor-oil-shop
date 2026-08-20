import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";

function ScrollTopButton({ show, onClick }) {
  const { t } = useContext(LanguageContext);

  if (!show) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 left-6 bg-black text-white w-12 h-12 rounded-full shadow-xl text-xl"
      aria-label={t("products.scrollTop")}
    >
      ↑
    </button>
  );
}

export default ScrollTopButton;
