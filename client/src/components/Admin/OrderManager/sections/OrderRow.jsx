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

// تیک «انجام شد»: سفارش رسیدگی شده تا ادمین دوباره سراغش نره (جدا از دکمه‌ی باز/بسته‌ی ردیف)
function DoneTick({ done, name, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      aria-label={
        done ? `برداشتن تیک انجام شد برای ${name}` : `تیک انجام شد برای ${name}`
      }
      title={done ? "انجام شده؛ کلیک برای برداشتن تیک" : "علامت انجام شد"}
      className="shrink-0 self-start mt-2.5 mr-3 p-1 rounded-lg hover:bg-gray-100"
    >
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-md border-2 ${
          done
            ? "bg-green-600 border-green-600 text-white"
            : "border-gray-400 bg-white text-transparent"
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  );
}

// یک سفارش در یک ردیف فشرده؛ کلیک ← جزئیات کامل (اقلام، وضعیت، حذف و…) زیر همون ردیف
function OrderRow({
  order,
  open,
  onToggle,
  onToggleDone,
  setItemUnavailable,
  statuses,
  updateOrderStatus,
  deleteOrder,
}) {
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
    <article
      className={`rounded-xl shadow border-r-8 ${style.stripe} ${order.done ? "bg-green-50" : "bg-white"}`}
    >
      <div className="flex">
        <DoneTick
          done={!!order.done}
          name={summary.name}
          onToggle={onToggleDone}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={detailsId}
          className={`flex-1 min-w-0 text-right px-4 py-3 hover:bg-gray-50 rounded-xl ${order.done ? "opacity-60" : ""}`}
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
                <span className={`font-bold ${summary.payment.className}`}>
                  {summary.payment.label}
                </span>
              </span>

              <span className="font-extrabold">{summary.total}</span>
            </div>
          </div>

          {/* دسکتاپ: یک ردیف هم‌تراز با سرستون‌ها */}
          <div
            className={`hidden md:grid ${ORDER_ROW_GRID} items-center gap-3 text-sm`}
          >
            <span className="font-bold truncate">{summary.name}</span>
            <span dir="ltr" className="text-right text-gray-700">
              {summary.phone}
            </span>
            <span className="text-gray-700">{summary.date}</span>
            <span className="text-gray-700">{summary.itemCount}</span>
            <span className="font-extrabold">{summary.total}</span>
            <span className={`font-bold ${summary.payment.className}`}>
              {summary.payment.label}
            </span>
            <span>{statusBadge}</span>
            <Chevron open={open} />
          </div>
        </button>
      </div>

      {open && (
        <div id={detailsId} className="border-t border-gray-200 p-4 sm:p-6">
          <OrderDetails
            order={order}
            statuses={statuses}
            updateOrderStatus={updateOrderStatus}
            setItemUnavailable={setItemUnavailable}
            deleteOrder={deleteOrder}
          />
        </div>
      )}
    </article>
  );
}

export default OrderRow;
