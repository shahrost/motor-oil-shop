function OrderDashboard({ orders, dashboard }) {
  return (
    <section>
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">کل سفارش‌ها</p>

          <p className="text-3xl font-bold mt-3">{orders.length}</p>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">فروش کل</p>

          <p className="text-xl font-bold mt-3 text-green-700">
            {dashboard.totalSales.toLocaleString()}
            تومان
          </p>
        </div>

        <div className="bg-blue-100 rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">تعداد کالا فروخته شده</p>

          <p className="text-3xl font-bold mt-3">{dashboard.totalProducts}</p>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">سفارش جدید</p>

          <p className="text-3xl font-bold mt-3">
            {orders.filter((order) => order.status === "جدید").length}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">💵 سفارش نقدی</p>

          <p className="text-3xl font-bold mt-3 text-green-700">
            {dashboard.cashOrders}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl shadow p-5 text-center">
          <p className="font-bold text-gray-600">📝 سفارش اعتباری</p>

          <p className="text-3xl font-bold mt-3 text-blue-700">
            {dashboard.checkOrders}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-xl mb-3">🥇 پرفروش‌ترین برند</h3>

          <p className="text-green-700 font-bold">{dashboard.bestBrand}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-xl mb-3">🔥 پرفروش‌ترین محصول</h3>

          <p className="text-green-700 font-bold">{dashboard.bestProduct}</p>
        </div>
      </div>
    </section>
  );
}

export default OrderDashboard;
