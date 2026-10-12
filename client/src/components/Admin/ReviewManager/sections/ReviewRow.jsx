import { Link } from "react-router-dom";

import Stars from "../../../common/Stars";

// یک نظر در پنل ادمین: خودرو، امتیاز، نام، تاریخ، متن و دکمه‌های تأیید/حذف
function ReviewRow({ review, busy, onApprove, onRemove }) {
  return (
    <li className="py-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <Link
          to={`/vehicle/${review.vehicleId}`}
          target="_blank"
          className="font-extrabold text-blue-700 hover:underline"
        >
          {review.vehicleName || "خودروی حذف‌شده"}
        </Link>

        <Stars value={review.rating} label={`${review.rating}/5`} />

        <span className="font-bold text-gray-700">{review.name || "کاربر مهمان"}</span>

        <span className="text-xs text-gray-500">
          {new Date(review.createdAt).toLocaleString("fa-IR")}
        </span>

        {review.approved && (
          <span className="text-xs font-bold text-green-700">✓ تأییدشده</span>
        )}
      </div>

      {review.text ? (
        <p className="mt-2 text-sm text-gray-800 whitespace-pre-line break-words">
          {review.text}
        </p>
      ) : (
        <p className="mt-2 text-xs text-gray-500">(فقط امتیاز، بدون متن)</p>
      )}

      <div className="mt-3 flex gap-2">
        {!review.approved && review.text && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onApprove(review.id)}
            className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50"
          >
            تأیید و نمایش
          </button>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={() => onRemove(review.id)}
          className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50"
        >
          حذف
        </button>
      </div>
    </li>
  );
}

export default ReviewRow;
