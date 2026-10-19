import { useContext } from "react";
import useAccountOrders from "./hooks/useAccountOrders";
import LanguageContext from "../../context/LanguageContext";
import { AccountTabs, OrderHistory } from "./sections";

// «خریدهای من»
function AccountOrders() {
  const { language, t } = useContext(LanguageContext);
  const { orders, loadingOrders } = useAccountOrders();

  return (
    <div className="max-w-3xl mx-auto my-10 px-5 space-y-6">
      <AccountTabs t={t} />

      <OrderHistory
        orders={orders}
        loadingOrders={loadingOrders}
        language={language}
        t={t}
      />
    </div>
  );
}

export default AccountOrders;
