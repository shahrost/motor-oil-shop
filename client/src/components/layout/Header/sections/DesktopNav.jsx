import { Link } from "react-router-dom";

import menu from "../../../../data/menu";
import menuCategories from "../../../../data/menuCategories";

// منوی دسکتاپ؛ «محصولات» با هاور زیرمنوی دسته‌بندی‌ها رو باز می‌کنه
function DesktopNav({ t, language }) {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      {menu.map((item) =>
        item.key === "products" ? (
          <div key={item.path} className="relative group py-2">
            <Link
              to={item.path}
              className="
              flex
              items-center
              gap-1
              font-bold
              text-gray-200
              hover:text-yellow-400
              transition
              "
            >
              {t(`nav.${item.key}`)}
              <span className="text-xs">▾</span>
            </Link>

            <div
              className="
              absolute
              top-full
              right-0
              hidden
              group-hover:grid
              grid-cols-2
              gap-x-4
              gap-y-1
              bg-gray-900
              border
              border-gray-800
              rounded-xl
              shadow-xl
              p-4
              w-104
              z-50
              "
            >
              {menuCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="
                  text-sm
                  text-gray-200
                  hover:text-yellow-400
                  py-1.5
                  transition
                  "
                >
                  {language === "en" ? category.labelEn : category.label}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <Link
            key={item.path}
            to={item.path}
            className="
            font-bold
            text-gray-200
            hover:text-yellow-400
            transition
            "
          >
            {t(`nav.${item.key}`)}
          </Link>
        ),
      )}
    </nav>
  );
}

export default DesktopNav;
