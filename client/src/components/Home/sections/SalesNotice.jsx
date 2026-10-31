import { Megaphone } from "lucide-react";

// اطلاعیه‌ی موقت بالای صفحه‌ی اصلی (مثلاً بسته شدن فروش چند برند)؛ متن از translations
// (home.notice). برای برداشتن اطلاعیه، همین بخش رو از Home.jsx حذف کنید
function SalesNotice({ title, text }) {
  return (
    <div
      role="alert"
      className="max-w-4xl mx-auto mt-6 flex items-start gap-3 rounded-2xl border-2 border-red-500 bg-red-50 dark:bg-red-950/40 px-4 py-3 text-red-800 dark:text-red-200 shadow-sm"
    >
      <Megaphone size={22} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />

      <p className="text-sm sm:text-base leading-relaxed">
        <strong className="font-extrabold text-red-600 dark:text-red-400">{title}</strong>{" "}
        {text}
      </p>
    </div>
  );
}

export default SalesNotice;
