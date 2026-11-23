import { Gift } from "lucide-react";
import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

// تعداد و واحد هدیه؛ سفارش‌های قدیمی بدون giftUnit همچنان کارتنی نمایش داده می‌شوند.
function GiftBadge({ giftQty, giftUnit = "carton", className = "" }) {
  const { t } = useContext(LanguageContext);

  if (!(giftQty > 0)) return null;

  return (
    <p
      className={`bg-amber-50 border border-amber-300 text-amber-800 font-bold flex items-center justify-center gap-1.5 ${className}`}
    >
      <Gift size={16} /> {t("common.promotion.giftEarned")} {giftQty}{" "}
      {t(`common.orderUnit.${giftUnit === "number" ? "number" : "carton"}`)}
    </p>
  );
}

export default GiftBadge;
