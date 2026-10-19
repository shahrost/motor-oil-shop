import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import { statusColor, statusLabel } from "../../../utils/orderStatus";
import LanguageContext from "../../../context/LanguageContext";
import LastOrderItem from "./LastOrderItem";

// «آخرین سفارش ثبت‌شده‌ی شما» در صفحه‌ی سبد خرید
function LastOrder({ order, onHide }) {
  const { language, t } = useContext(LanguageContext);

  if (!order) return null;

  return (
    <div className="bg-white rounded-3xl shadow-md border p-5 mt-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-extrabold text-black">
          ✅ {t("order.lastOrder.title")}
        </h2>

        <button
          type="button"
          onClick={onHide}
          className="text-sm font-bold text-gray-600 border rounded-xl px-4 py-2"
        >
          {t("order.lastOrder.hide")}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700 mb-4">
        {order.id && (
          <span>
            {t("order.lastOrder.orderNumber")}{" "}
            <span className="font-bold">#{String(order.id).slice(0, 8)}</span>
          </span>
        )}

        {order.date && (
          <span>
            {t("order.lastOrder.date")} <span className="font-bold">{order.date}</span>
          </span>
        )}

        <span className="flex items-center gap-2">
          {t("order.lastOrder.status")}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(order.status)}`}
          >
            {statusLabel(order.status, t)}
          </span>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {order.items.map((item, index) => (
          <LastOrderItem key={`${item.productId}-${index}`} item={item} />
        ))}
      </div>

      <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-lg font-extrabold text-gray-950">
          {t("order.lastOrder.total")} {formatPrice(order.totalPrice, language)}
        </p>
      </div>
    </div>
  );
}

export default LastOrder;
