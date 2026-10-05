import formatPrice from "../../../utils/formatPrice";
import { statusColor, statusLabel } from "../helpers/orderStatus";

// یک سفارش در تاریخچه‌ی سفارش‌های مشتری
function OrderHistoryItem({ order, language, t }) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold">
          {t("account.orderNumber")} #{order.id.slice(0, 8)}
        </span>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(order.status)}`}
        >
          {statusLabel(order.status, t)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-2">{order.date}</p>

      <p className="text-gray-700 text-sm mb-2">
        {order.items?.length || 0} {t("account.itemsCount")}
      </p>

      <p className="text-gray-950 font-extrabold">
        {formatPrice(order.totalPrice, language)}
      </p>
    </div>
  );
}

export default OrderHistoryItem;
