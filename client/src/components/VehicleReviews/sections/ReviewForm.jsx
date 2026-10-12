import { useContext } from "react";

import LanguageContext from "../../../context/LanguageContext";
import Stars from "../../common/Stars";
import { TEXT_MAX } from "../hooks/useReviewForm";
import StarInput from "./StarInput";

const fieldClass =
  "w-full border-2 border-gray-200 rounded-xl p-3 bg-white text-black text-sm focus:border-yellow-400 outline-none";

// فرم ثبت امتیاز و نظر؛ بعد از ثبت (یا اگه قبلاً امتیاز داده شده) پیام تشکر
function ReviewForm({ form }) {
  const { t } = useContext(LanguageContext);

  if (form.myRating) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full gap-2 rounded-2xl bg-gray-50 p-6">
        <p className="text-lg font-extrabold text-gray-900">
          {form.justSent ? t("reviews.thanks") : t("reviews.alreadyRated")}
        </p>

        <Stars value={form.myRating} size="w-6 h-6" label={`${form.myRating}`} />

        {form.needsApproval && (
          <p className="text-sm text-gray-600">{t("reviews.pendingNote")}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} className="space-y-3">
      <p className="font-extrabold text-gray-900">{t("reviews.yourRating")}</p>

      <StarInput shown={form.shown} onSelect={form.setRating} onHover={form.setHover} />

      <input
        type="text"
        value={form.name}
        onChange={(e) => form.setName(e.target.value)}
        maxLength={40}
        placeholder={t("reviews.namePlaceholder")}
        className={fieldClass}
      />

      <div>
        <textarea
          value={form.text}
          onChange={(e) => form.setText(e.target.value)}
          rows={3}
          placeholder={t("reviews.textPlaceholder")}
          className={`${fieldClass} resize-y`}
        />

        <p className="text-xs text-gray-500 mt-1">
          {t("reviews.textNote")} ({form.text.length}/{TEXT_MAX})
        </p>
      </div>

      {/* فیلد مخفی ضد ربات؛ کاربر واقعی نمی‌بیندش */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => form.setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {form.error && (
        <p className="text-sm font-bold text-red-600">
          {form.error === "network" ? t("reviews.error") : form.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!form.rating || form.sending}
        className="w-full bg-yellow-400 text-gray-950 py-2.5 rounded-xl font-extrabold hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {form.sending ? t("reviews.sending") : t("reviews.submit")}
      </button>
    </form>
  );
}

export default ReviewForm;
