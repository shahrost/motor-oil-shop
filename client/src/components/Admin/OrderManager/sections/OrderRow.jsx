import OrderDetails from "./OrderDetails";
import orderStatusStyle from "../helpers/orderStatusStyle";
import orderSummary from "../helpers/orderSummary";
import ORDER_ROW_GRID from "../helpers/orderRowGrid";

function Chevron({ open }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={`w-5 h-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// یک سفارش در یک ردیف فشرده؛ کلیک ← جزئیات کامل (اقلام، وضعیت، حذف و…) زیر همون ردیف
function OrderRow({ order, open, onToggle, statuses, updateOrderStatus, deleteOrder }) {
  const style = orderStatusStyle(order.status);
  const summary = orderSummary(order);
  const detailsId = `order-details-${order.id}`;

  const statusBadge = (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${style.badge}`}
    >
      {order.status}
    </span>
  );

  return (
    <article className={`bg-white rounded-xl shadow border-r-8 ${style.stripe}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailsId}
        className="w-full text-right px-4 py-3 hover:bg-gray-50 rounded-xl"
      >
        {/* موبایل: سه خط کوتاه */}
        <div className="md:hidden text-sm space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold truncate">{summary.name}</span>

            <span className="flex items-center gap-1 shrink-0">
              {statusBadge}
              <Chevron open={open} />
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-gray-600">
            <span dir="ltr">{summary.phone}</span>
            <span>{summary.date}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-600">
              {summary.itemCount} ·{" "}
              <span className={`font-bold ${summary.payment.className}`}>{summary.payment.label}</span>
            </span>

            <span className="font-extrabold">{summary.total}</span>
          </div>
        </div>

        {/* دسکتاپ: یک ردیف هم‌تراز با سرستون‌ها */}
        <div className={`hidden md:grid ${ORDER_ROW_GRID} items-center gap-3 text-sm`}>
          <span className="font-bold truncate">{summary.name}</span>
          <span dir="ltr" className="text-right text-gray-700">
            {summary.phone}
          </span>
          <span className="text-gray-700">{summary.date}</span>
          <span className="text-gray-700">{summary.itemCount}</span>
          <span className="font-extrabold">{summary.total}</span>
          <span className={`font-bold ${summary.payment.className}`}>{summary.payment.label}</span>
          <span>{statusBadge}</span>
          <Chevron open={open} />
        </div>
      </button>

      {open && (
        <div id={detailsId} className="border-t border-gray-200 p-4 sm:p-6">
          <OrderDetails
            order={order}
            statuses={statuses}
            updateOrderStatus={updateOrderStatus}
            deleteOrder={deleteOrder}
          />
        </div>
      )}
    </article>
  );
}

export default OrderRow;
