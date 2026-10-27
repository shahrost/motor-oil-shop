import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// تیتر یکسان بخش‌های صفحه‌ی اصلی: عنوان + لینک «مشاهده همه» در یک ردیف (لینک اختیاری)
function HomeSectionHeader({ title, to, linkLabel }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>

      {to && (
        <Link
          to={to}
          className="shrink-0 inline-flex items-center gap-0.5 text-sm font-bold text-yellow-700 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          {linkLabel}
          <ChevronLeft size={16} className="ltr:rotate-180" />
        </Link>
      )}
    </div>
  );
}

export default HomeSectionHeader;
