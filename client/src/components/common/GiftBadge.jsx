import { useContext } from "react";
import LanguageContext from "../../context/LanguageContext";

// «🎁 هدیه این خرید: N کارتن» — فقط وقتی هدیه‌ای تعلق بگیره نمایش داده می‌شه
function GiftBadge({ giftQty, className = "" }) {
  const { t } = useContext(LanguageContext);

  if (!(giftQty > 0)) return null;

  return (
    <p
      className={`bg-amber-50 border border-amber-300 text-amber-800 font-bold text-center ${className}`}
    >
      🎁 {t("common.promotion.giftEarned")} {giftQty}{" "}
      {t("common.orderUnit.carton")}
    </p>
  );
}

export default GiftBadge;
