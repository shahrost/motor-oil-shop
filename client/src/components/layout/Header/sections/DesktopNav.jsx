import { useContext } from "react";
import { Link } from "react-router-dom";

import LanguageContext from "../../../../context/LanguageContext";

import menu from "../../../../data/menu";
import menuCategories from "../../../../data/menuCategories";
import localizedLabel from "../../../../utils/localizedLabel";
import NavDropdown from "./NavDropdown";

// منوی دسکتاپ؛ «محصولات» با هاور زیرمنوی دسته‌ها رو باز می‌کنه
function DesktopNav() {
  const { language, t } = useContext(LanguageContext);

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {menu.map((item) => {
        const label = t(`nav.${item.key}`);

        if (item.key === "products") {
          return (
            <NavDropdown
              key={item.path}
              to={item.path}
              label={label}
              panelClassName="right-0 group-hover:grid grid-cols-2 gap-x-4 gap-y-1 p-4 w-104"
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
                  {localizedLabel(category, language)}
                </Link>
              ))}
            </NavDropdown>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className="
            font-bold
            whitespace-nowrap
            text-gray-200
            hover:text-yellow-400
            transition
            "
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default DesktopNav;
