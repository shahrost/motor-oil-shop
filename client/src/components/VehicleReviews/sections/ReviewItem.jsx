import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import Stars from "../../common/Stars";

// یک نظر تأییدشده: نام (یا «کاربر مهمان»)، ستاره‌ها، تاریخ و متن
function ReviewItem({ review }) {
  const { language, t } = useContext(LanguageContext);
  const date = new Date(review.createdAt).toLocaleDateString(
    language === "fa" ? "fa-IR" : "en-US",
  );

  return (
    <li className="py-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-extrabold text-gray-900">
          {review.name || t("reviews.guest")}
        </span>

        <Stars value={review.rating} label={`${review.rating}/5`} />

        <span className="text-xs text-gray-500">{date}</span>
      </div>

      <p className="mt-2 text-sm text-gray-700 leading-7 whitespace-pre-line break-words">
        {review.text}
      </p>
    </li>
  );
}

export default ReviewItem;
