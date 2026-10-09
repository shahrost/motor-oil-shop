import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../../context/LanguageContext";
import menuCategories from "../../../../data/menuCategories";
import localizedLabel from "../../../../utils/localizedLabel";

// زیرمنوی دسته‌های «محصولات» در منوی موبایل
function MobileCategoryList({ onSelect }) {
  const { language } = useContext(LanguageContext);

  return (
    <ul className="mt-3 grid grid-cols-2 gap-2">
      {menuCategories.map((category) => (
        <li key={category.slug}>
          <Link
            to={`/category/${category.slug}`}
            onClick={onSelect}
            className="block text-sm text-gray-300 hover:text-yellow-400 bg-gray-800 rounded-lg py-2"
          >
            {localizedLabel(category, language)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MobileCategoryList;
