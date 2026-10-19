import { NavLink } from "react-router-dom";
import accountMenu from "../../../data/accountMenu";

// نوار بالای صفحه‌های حساب (همون فهرست منوی پروفایل هدر)
function AccountTabs({ t }) {
  return (
    <nav className="flex gap-2 overflow-x-auto bg-white rounded-2xl shadow p-2">
      {accountMenu.map((item) => (
        <NavLink
          key={item.key}
          to={item.path}
          end
          className={({ isActive }) =>
            `flex-1 whitespace-nowrap text-center px-4 py-3 rounded-xl font-bold transition ${
              isActive ? "bg-yellow-400 text-gray-950" : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {item.icon} {t(`header.accountMenu.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  );
}

export default AccountTabs;
