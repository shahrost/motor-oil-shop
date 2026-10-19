import { useState } from "react";
import formatPrice from "../../../utils/formatPrice";
import { statusColor, statusLabel } from "../../../utils/orderStatus";
import OrderItemSummary from "../../common/OrderItemSummary";

// یک سفارش در «خریدهای من»؛ با «مشاهده جزئیات» اقلام سفارش باز می‌شن
function OrderHistoryItem({ order, language, t }) {
  const [open, setOpen] = useState(false);

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

      <div className="flex items-center justify-between gap-3">
        <p className="text-gray-950 font-extrabold">
          {formatPrice(order.totalPrice, language)}
        </p>

        {order.items?.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="text-sm font-bold text-gray-700 border rounded-xl px-4 py-2"
          >
            {open ? t("account.hideDetails") : t("account.showDetails")}
          </button>
        )}
      </div>

      {open && (
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {order.items.map((item, index) => (
            <OrderItemSummary key={`${item.productId}-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryItem;
