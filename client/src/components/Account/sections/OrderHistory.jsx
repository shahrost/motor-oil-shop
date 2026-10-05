import OrderHistoryItem from "./OrderHistoryItem";

// لیست سفارش‌های مشتری (در حال دریافت / خالی / لیست)
function OrderHistory({ orders, loadingOrders, language, t }) {
  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <h2 className="text-xl font-extrabold mb-5">{t("account.myOrders")}</h2>

      {loadingOrders && <p className="text-gray-600">{t("account.loading")}</p>}

      {!loadingOrders && orders.length === 0 && (
        <p className="text-gray-600">{t("account.noOrders")}</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderHistoryItem key={order.id} order={order} language={language} t={t} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
