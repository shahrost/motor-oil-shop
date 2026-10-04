import OrderProducts from "./OrderProducts";
import orderStatusStyle from "../helpers/orderStatusStyle";

function OrderCard({ order, updateOrderStatus, deleteOrder, statuses }) {
  const style = orderStatusStyle(order.status);

  return (
    <article
      className={`bg-white rounded-xl shadow p-6 border-r-8 ${style.stripe}`}
    >
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-bold">سفارش #{order.id}</h2>

          <span className={`px-3 py-1 rounded-full text-sm font-bold ${style.badge}`}>
            {order.status}
          </span>
        </div>

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
        </div>

        <div>
          <OrderProducts items={order.items} />

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
              مبلغ کل سفارش: {Number(order.totalPrice || 0).toLocaleString()}
              تومان
            </p>
          </div>
        </div>
      </div>

      <p
        className="
      text-gray-600
      mt-4
      text-sm
      "
      >
        تاریخ ثبت: {order.date}
      </p>
    </article>
  );
}

export default OrderCard;
