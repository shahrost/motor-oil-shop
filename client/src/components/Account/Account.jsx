import { useContext } from "react";
import useAccount from "./hooks/useAccount";
import formatPrice from "../../utils/formatPrice";
import LanguageContext from "../../context/LanguageContext";

function statusColor(status) {
  if (status === "جدید") return "bg-yellow-200 text-yellow-900";
  if (status === "تماس گرفته شد") return "bg-blue-200 text-blue-900";
  if (status === "آماده ارسال") return "bg-orange-200 text-orange-900";
  if (status === "ارسال شد") return "bg-green-200 text-green-900";
  if (status === "تحویل شد") return "bg-gray-300 text-gray-900";
  return "bg-gray-100 text-gray-800";
}

const statusKeyMap = {
  جدید: "new",
  "تماس گرفته شد": "contacted",
  "آماده ارسال": "readyToShip",
  "ارسال شد": "shipped",
  "تحویل شد": "delivered",
};

function Account() {
  const { language, t } = useContext(LanguageContext);
  const { customer, logout, orders, loadingOrders } = useAccount();

  function statusLabel(status) {
    const key = statusKeyMap[status];

    return key ? t(`account.orderStatus.${key}`) : status;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 space-y-6">
      <div className="bg-white rounded-3xl shadow p-8 text-center">
        <h1 className="text-2xl font-extrabold mb-6">{t("account.title")}</h1>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-right">
          <p className="mb-2">
            <b>{t("account.name")}</b> {customer?.name}
          </p>

          <p>
            <b>{t("account.phone")}</b> {customer?.phone}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          {t("account.logout")}
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow p-8">
        <h2 className="text-xl font-extrabold mb-5">{t("account.myOrders")}</h2>

        {loadingOrders && <p className="text-gray-600">{t("account.loading")}</p>}

        {!loadingOrders && orders.length === 0 && (
          <p className="text-gray-600">{t("account.noOrders")}</p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold">
                  {t("account.orderNumber")} #{order.id.slice(0, 8)}
                </span>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(order.status)}`}
                >
                  {statusLabel(order.status)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-2">{order.date}</p>

              <p className="text-gray-700 text-sm mb-2">
                {order.items?.length || 0} {t("account.itemsCount")}
              </p>

              <p className="text-green-700 font-bold">
                {formatPrice(order.totalPrice, language)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
