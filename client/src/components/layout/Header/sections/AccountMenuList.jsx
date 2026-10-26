import { useContext } from "react";
import { Link } from "react-router-dom";
import { Headset, LogOut, Phone } from "lucide-react";

import LanguageContext from "../../../../context/LanguageContext";
import accountMenu from "../../../../data/accountMenu";
import { PHONE_URL, PHONE_DISPLAY } from "../../../../data/contact";

const ITEM_CLASS =
  "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-start transition";

// فهرست منوی پروفایل؛ مشترک بین کادر بازشونده‌ی دسکتاپ و منوی موبایل
function AccountMenuList({ onNavigate, showSupport, onToggleSupport, onLogout, dark = false }) {
  const { t } = useContext(LanguageContext);
  const itemColor = dark
    ? "text-gray-200 hover:bg-gray-700"
    : "text-gray-800 hover:bg-gray-100";

  return (
    <ul className="flex flex-col gap-1">
      {accountMenu.map((item) => (
        <li key={item.key}>
          <Link to={item.path} onClick={onNavigate} className={`${ITEM_CLASS} ${itemColor}`}>
            <item.icon />
            {t(`header.accountMenu.${item.key}`)}
          </Link>
        </li>
      ))}

      <li>
        <button
          type="button"
          onClick={onToggleSupport}
          aria-expanded={showSupport}
          className={`${ITEM_CLASS} ${itemColor}`}
        >
          <Headset />
          {t("header.accountMenu.support")}
        </button>

        {/* شماره با کلیک ظاهر می‌شه؛ لمسش روی گوشی مستقیم زنگ می‌زنه */}
        {showSupport && (
          <a
            href={PHONE_URL}
            className="mx-4 mt-1 mb-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-extrabold"
          >
            <Phone /> <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
        )}
      </li>

      <li className={`border-t mt-1 pt-1 ${dark ? "border-gray-700" : "border-gray-200"}`}>
        <button
          type="button"
          onClick={onLogout}
          className={`${ITEM_CLASS} ${dark ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-red-50"}`}
        >
          <LogOut />
          {t("header.accountMenu.logout")}
        </button>
      </li>
    </ul>
  );
}

export default AccountMenuList;
