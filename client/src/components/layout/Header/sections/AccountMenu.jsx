import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

import LanguageContext from "../../../../context/LanguageContext";
import useAccountLink from "../hooks/useAccountLink";
import useAccountMenu from "../hooks/useAccountMenu";
import AccountMenuList from "./AccountMenuList";

// دکمه‌ی حساب در هدر دسکتاپ: مهمان ← لینک ثبت‌نام؛ مشتری واردشده ← کادر فهرست پروفایل
function AccountMenu({ buttonClass }) {
  const { t } = useContext(LanguageContext);
  const account = useAccountLink();
  const { rootRef, open, toggle, close, showSupport, toggleSupport, handleLogout } =
    useAccountMenu();

  const className = `hidden sm:flex items-center justify-center ${buttonClass} w-11 h-11 rounded-xl font-bold text-[11px] leading-tight text-center px-1 truncate transition`;

  if (!account.firstName) {
    return (
      <Link to={account.to} title={t("header.register")} className={className}>
        {t("header.register")}
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        title={account.customerName}
        aria-haspopup="menu"
        aria-expanded={open}
        className={className}
      >
        <User size={16} />
        {account.firstName}
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 z-50 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-2">
          <p className="px-4 pt-2 pb-3 text-sm text-gray-500 border-b border-gray-200 mb-1 truncate">
            {account.customerName}
          </p>

          <AccountMenuList
            onNavigate={close}
            showSupport={showSupport}
            onToggleSupport={toggleSupport}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
