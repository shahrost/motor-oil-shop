import { Link } from "react-router-dom";

import menu from "../../../../data/menu";
import menuCategories from "../../../../data/menuCategories";
import useVehicleMenuGroups from "../../../../hooks/useVehicleMenuGroups";
import NavDropdown from "./NavDropdown";
import VehicleMenuPanel from "./VehicleMenuPanel";

// منوی دسکتاپ؛ «محصولات» و «خودروها» با هاور زیرمنو باز می‌کنن
function DesktopNav({ t, language }) {
  const { domestic, foreign, requestVehicles } = useVehicleMenuGroups();

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
                  {language === "en" ? category.labelEn : category.label}
                </Link>
              ))}
            </NavDropdown>
          );
        }

        if (item.key === "vehicles") {
          return (
            <NavDropdown
              key={item.path}
              to={item.path}
              label={label}
              onOpen={requestVehicles}
              panelClassName="start-0 group-hover:block p-5 w-160 max-h-[75vh] overflow-y-auto"
            >
              <VehicleMenuPanel
                t={t}
                language={language}
                domestic={domestic}
                foreign={foreign}
              />
            </NavDropdown>
          );
        }

        return (
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
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default DesktopNav;
