import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import { StarShape } from "../../common/Stars";

// انتخاب امتیاز ۱ تا ۵ با ستاره (هاور پیش‌نمایش می‌ده)
function StarInput({ shown, onSelect, onHover }) {
  const { t } = useContext(LanguageContext);

  return (
    <div
      role="radiogroup"
      aria-label={t("reviews.yourRating")}
      className="flex items-center gap-1"
      onMouseLeave={() => onHover(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={shown === star}
          aria-label={t("reviews.starLabel").replace("{count}", star)}
          onClick={() => onSelect(star)}
          onMouseEnter={() => onHover(star)}
          onFocus={() => onHover(star)}
          onBlur={() => onHover(0)}
          className="p-0.5 rounded transition hover:scale-110"
        >
          <StarShape
            className={`w-8 h-8 ${star <= shown ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
          />
        </button>
      ))}

      {shown > 0 && (
        <span className="ms-2 text-sm font-bold text-gray-600">
          {t(`reviews.levels.${shown}`)}
        </span>
      )}
    </div>
  );
}

export default StarInput;
