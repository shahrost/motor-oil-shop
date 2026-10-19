import { useContext } from "react";
import useAccount from "./hooks/useAccount";
import LanguageContext from "../../context/LanguageContext";
import { AccountTabs, ProfileCard } from "./sections";

// «حساب کاربری»: اطلاعات مشتری + خروج
function Account() {
  const { t } = useContext(LanguageContext);
  const { customer, logout } = useAccount();

  return (
    <div className="max-w-2xl mx-auto my-10 px-5 space-y-6">
      <AccountTabs t={t} />

      <ProfileCard customer={customer} logout={logout} t={t} />
    </div>
  );
}

export default Account;
