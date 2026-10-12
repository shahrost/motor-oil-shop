import { useContext } from "react";

import LanguageContext from "../../context/LanguageContext";
import useReviewForm from "./hooks/useReviewForm";
import { RatingSummary, ReviewForm, ReviewItem } from "./sections";

// بخش «امتیاز و نظرات کاربران» صفحه‌ی خودرو. reviews = خروجی useVehicleReviews
// (در VehicleDetail گرفته می‌شه چون خلاصه‌ی امتیاز بالای صفحه هم لازمه)
function VehicleReviews({ vehicleId, reviews }) {
  const { t } = useContext(LanguageContext);
  const form = useReviewForm(vehicleId, reviews.submit);

  return (
    <section id="reviews" className="scroll-mt-24 mt-10">
      <h2 className="text-2xl font-extrabold text-gray-900">{t("reviews.title")}</h2>

      <div className="mt-4 grid gap-6 md:grid-cols-2 border-2 border-gray-200 rounded-2xl bg-white p-5 shadow-sm">
        <RatingSummary summary={reviews.summary} />

        <ReviewForm form={form} />
      </div>

      {reviews.reviews.length > 0 ? (
        <ul className="mt-4 divide-y divide-gray-200 border-2 border-gray-200 rounded-2xl bg-white px-5 shadow-sm">
          {reviews.reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        !reviews.loading && (
          <p className="mt-4 text-center text-sm font-bold text-gray-500">
            {t("reviews.empty")}
          </p>
        )
      )}
    </section>
  );
}

export default VehicleReviews;
