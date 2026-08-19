import OrderProducts from "./OrderProducts";

function OrderCard({ order, updateOrderStatus, deleteOrder, statuses }) {
  function statusColor(status) {
    if (status === "جدید") return "bg-yellow-200";

    if (status === "تماس گرفته شد") return "bg-blue-200";

    if (status === "آماده ارسال") return "bg-orange-200";

    if (status === "ارسال شد") return "bg-green-200";

    if (status === "تحویل شد") return "bg-gray-300";

    return "bg-white";
  }

  return (
    <article
      className={`
      rounded-xl
      shadow
      p-6
      ${statusColor(order.status)}
      `}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">سفارش #{order.id}</h2>

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
          bg-green-100
          rounded-xl
          p-4
          mt-5
          "
          >
            <p
              className="
            text-xl
            font-bold
            text-green-700
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
