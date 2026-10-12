import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import Stars from "../../common/Stars";

// خلاصه‌ی امتیاز کنار نام خودرو؛ کلیک ← اسکرول به بخش نظرات (#reviews)
function VehicleRatingLink({ summary }) {
  const { t } = useContext(LanguageContext);

  function scrollToReviews() {
    document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToReviews}
      className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-yellow-700 transition"
    >
      <Stars value={summary.average} label={`${summary.average}/5`} />

      {summary.count
        ? `${summary.average.toFixed(1)} (${t("reviews.basedOn").replace("{count}", summary.count)})`
        : t("reviews.beFirst")}
    </button>
  );
}

export default VehicleRatingLink;
