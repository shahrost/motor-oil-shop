import useReviewManager, { REVIEW_FILTERS } from "./hooks/useReviewManager";
import { ReviewRow } from "./sections";

// بخش «نظرات خودروها» پنل ادمین: متن نظرها فقط بعد از تأیید روی سایت دیده می‌شن
function ReviewManager() {
  const manager = useReviewManager();

  return (
    <section className="bg-white p-6 rounded-xl shadow-lg mt-8" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">نظرات خودروها</h2>

        <button
          type="button"
          onClick={manager.reload}
          className="text-sm font-bold text-blue-700 hover:underline"
        >
          بروزرسانی
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        امتیازها بلافاصله در میانگین خودرو حساب می‌شن؛ متن نظر فقط بعد از «تأیید» روی سایت
        نمایش داده می‌شه. حذف، امتیاز رو هم برمی‌داره.
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {REVIEW_FILTERS.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => manager.setStatus(filter.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${
              manager.status === filter.key
                ? "bg-yellow-400 border-yellow-400 text-gray-950"
                : "border-gray-200 text-gray-700"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {manager.error && (
        <p className="mt-4 text-sm font-bold text-red-600">{manager.error}</p>
      )}

      {manager.loading ? (
        <p className="mt-4 text-sm text-gray-500">در حال دریافت...</p>
      ) : manager.reviews.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">نظری در این بخش نیست.</p>
      ) : (
        <ul className="mt-2 divide-y divide-gray-200">
          {manager.reviews.map((review) => (
            <ReviewRow
              key={review.id}
              review={review}
              busy={manager.busyId === review.id}
              onApprove={manager.approve}
              onRemove={manager.remove}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ReviewManager;
