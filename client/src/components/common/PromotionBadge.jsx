import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

function PromotionBadge({ className = "" }) {
  const { t } = useContext(LanguageContext);

  return (
    <span
      className={`inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full ${className}`}
    >
      🎁 {t("common.promotion.badge")}
    </span>
  );
}

export default PromotionBadge;
