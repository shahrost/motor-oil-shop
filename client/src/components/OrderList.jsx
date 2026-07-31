import { useContext } from "react";
import OrderContext from "../context/OrderContext";

function OrderList() {
  const { orders, updateOrderStatus, deleteOrder } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-2xl font-bold">سفارش جدیدی وجود ندارد</h2>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-5">مدیریت سفارش‌ها</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-5 rounded-xl shadow"
            dir="rtl"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <p>
                <b>نام مشتری:</b> {order.customer.Name}
              </p>

              <p>
                <b>شماره تماس:</b> {order.customer.phone}
              </p>

              <p>
                <b>شهر:</b> {order.customer.area}
              </p>

              <p>
                <b>محصول:</b> {order.productName}
              </p>

              <p>
                <b>تعداد:</b> {order.quantity}
              </p>

              <p>
                <b>پرداخت:</b> {order.payment}
              </p>

              <p>
                <b>قیمت:</b> {order.price}
              </p>

              <p>
                <b>تاریخ:</b> {order.date}
              </p>
            </div>

            <p className="mt-3">
              <b>توضیحات:</b> {order.description || "ندارد"}
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={() => updateOrderStatus(order.id, "جدید")}
                className="bg-yellow-400 px-4 py-2 rounded"
              >
                جدید
              </button>

              <button
                onClick={() => updateOrderStatus(order.id, "در حال پیگیری")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                در حال پیگیری
              </button>

              <button
                onClick={() => updateOrderStatus(order.id, "ارسال شد")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                ارسال شد
              </button>

              <button
                onClick={() => updateOrderStatus(order.id, "لغو شد")}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                لغو
              </button>

              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                حذف سفارش
              </button>
            </div>

            <p className="mt-4 font-bold">
              وضعیت فعلی:
              <span className="mr-2 text-green-700">{order.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
