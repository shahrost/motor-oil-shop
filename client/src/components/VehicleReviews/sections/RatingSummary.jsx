import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import Stars from "../../common/Stars";

// میانگین امتیاز، تعداد رأی‌ها و نمودار تعداد هر امتیاز (۵ تا ۱)
function RatingSummary({ summary }) {
  const { t } = useContext(LanguageContext);
  const { count, average, distribution } = summary;

  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-5xl font-extrabold text-gray-900">
        {count ? average.toFixed(1) : "–"}
      </p>

      <p className="text-sm text-gray-500 mt-1">{t("reviews.outOf5")}</p>

      <div className="mt-2">
        <Stars
          value={average}
          size="w-6 h-6"
          label={`${average} ${t("reviews.outOf5")}`}
        />
      </div>

      <p className="text-sm font-bold text-gray-600 mt-2">
        {count
          ? t("reviews.basedOn").replace("{count}", count)
          : t("reviews.noRatings")}
      </p>

      <div className="w-full max-w-xs mt-4 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const n = distribution[star] || 0;

          return (
            <div key={star} className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <span className="w-3 text-center">{star}</span>
              <span className="text-yellow-500" aria-hidden="true">★</span>

              <span className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <span
                  className="block h-full rounded-full bg-yellow-400"
                  style={{ width: count ? `${(n / count) * 100}%` : 0 }}
                />
              </span>

              <span className="w-6 text-end">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingSummary;
