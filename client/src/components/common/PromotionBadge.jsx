import { Gift } from "lucide-react";
import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

// نشان «طرح فروش ویژه»؛ compact: نسخه‌ی ریز روی عکس کارت محصول
function PromotionBadge({ className = "", compact = false }) {
  const { t } = useContext(LanguageContext);

  return (
    <span
      className={`inline-flex items-center gap-1 bg-amber-500 text-white font-bold rounded-full ${
        compact ? "text-[10px] leading-4 px-2 py-0.5" : "text-xs px-3 py-1"
      } ${className}`}
    >
      <Gift size={compact ? 12 : 16} /> {t("common.promotion.badge")}
    </span>
  );
}

export default PromotionBadge;
