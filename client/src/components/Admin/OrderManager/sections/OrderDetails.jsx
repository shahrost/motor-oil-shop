import OrderProducts from "./OrderProducts";
import OrderPdf from "./OrderPdf";
import mapLink from "../helpers/mapLink";
import { availableTotal } from "../helpers/orderInvoice";
import { formatToman, orderDateLabel } from "../helpers/orderSummary";

// جزئیات کامل یک سفارش (بخش بازشده‌ی ردیف): وضعیت، حذف، مشتری، اقلام و مبلغ
function OrderDetails({ order, updateOrderStatus, setItemUnavailable, deleteOrder, statuses }) {
  const locationUrl = mapLink(order.customer?.location);
  const hasUnavailable = order.items?.some((item) => item.unavailable);

  return (
    <section>
      <div className="flex justify-between items-center gap-3 mb-5">
        <h2 className="text-lg sm:text-xl font-bold">
          سفارش #{String(order.id).slice(0, 8)}
        </h2>

        <button
          onClick={() => deleteOrder(order.id)}
          className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          حذف
        </button>
      </div>

      <div className="mb-5">
        <b>وضعیت سفارش:</b>

        <select
          value={order.status}
          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          className="
          mr-3
          p-2
          rounded-lg
          border
          bg-white
          text-black
          "
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <p>
            <b>نام مشتری:</b> {order.customer?.name}
          </p>

          <p className="mt-2">
            <b>شماره تماس:</b> {order.customer?.phone}
          </p>

          <a
            href={`tel:${order.customer?.phone}`}
            className="
            inline-block
            mt-3
            bg-green-600
            text-white
            px-4
            py-2
            rounded-lg
            "
          >
            تماس با مشتری
          </a>

          <p className="mt-2">
            <b>منطقه:</b> {order.customer?.area}
          </p>

          <p className="mt-2">
            <b>آدرس:</b> {order.customer?.address}
          </p>

          {locationUrl && (
            <a
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              📍 نمایش موقعیت روی نقشه
            </a>
          )}
        </div>

        <div>
          <OrderProducts
            items={order.items}
            onToggleUnavailable={(index, unavailable) =>
              setItemUnavailable(order.id, index, unavailable)
            }
          />

          <div
            className="
          bg-gray-100
          rounded-xl
          p-4
          mt-5
          "
          >
            <p
              className="
            text-xl
            font-bold
            "
            >
              مبلغ کل سفارش: {formatToman(order.totalPrice)}
            </p>

            {hasUnavailable && (
              <p className="mt-2 text-lg font-bold text-green-700">
                مبلغ نهایی (بدون اقلام ناموجود): {formatToman(availableTotal(order.items))}
              </p>
            )}
          </div>

          <OrderPdf order={order} />
        </div>
      </div>

      <p
        className="
      text-gray-600
      mt-4
      text-sm
      "
      >
        تاریخ ثبت: {orderDateLabel(order)}
      </p>
    </section>
  );
}

export default OrderDetails;
