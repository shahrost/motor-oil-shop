import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../context/LanguageContext";
import localizedLabel from "../../../utils/localizedLabel";
import useCategoryChips from "../hooks/useCategoryChips";

// ردیف افقی قابل‌اسکرول دکمه‌های دسته در انتهای صفحه‌ی محصولات؛ هر دکمه به /category/...
function CategoryChips() {
  const { language, t } = useContext(LanguageContext);
  const categories = useCategoryChips();

  return (
    <nav aria-label={t("products.categories")} className="-mx-5 px-5">
      <ul className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {categories.map(({ slug, icon: Icon, ...category }) => (
          <li key={slug} className="shrink-0">
            <Link
              to={`/category/${slug}`}
              className="flex items-center gap-1.5 whitespace-nowrap bg-white border border-gray-200 rounded-full px-3.5 py-2 text-sm font-bold text-gray-800 shadow-sm hover:border-yellow-400 hover:text-yellow-700 transition"
            >
              {Icon && <Icon size={16} className="text-yellow-600 dark:text-yellow-400" />}
              {localizedLabel(category, language)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryChips;
