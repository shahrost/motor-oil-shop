import { useContext } from "react";
import useAccount from "./hooks/useAccount";
import LanguageContext from "../../context/LanguageContext";
import ProfileCard from "./sections/ProfileCard";
import OrderHistory from "./sections/OrderHistory";

function Account() {
  const { language, t } = useContext(LanguageContext);
  const { customer, logout, orders, loadingOrders } = useAccount();

  return (
    <div className="max-w-2xl mx-auto my-10 space-y-6">
      <ProfileCard customer={customer} logout={logout} t={t} />

      <OrderHistory
        orders={orders}
        loadingOrders={loadingOrders}
        language={language}
        t={t}
      />
    </div>
  );
}

export default Account;
