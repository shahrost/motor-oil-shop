function OrderDashboard({ orders, dashboard }) {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">کل سفارش‌ها</p>

          <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3">{orders.length}</p>
        </div>

        <div className="bg-green-100 rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">فروش کل</p>

          <p className="text-base sm:text-xl font-bold mt-2 sm:mt-3 text-green-700">
            {dashboard.totalSales.toLocaleString()}
            تومان
          </p>
        </div>

        <div className="bg-blue-100 rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">تعداد کالا فروخته شده</p>

          <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3">{dashboard.totalProducts}</p>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">سفارش جدید</p>

          <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3">
            {orders.filter((order) => order.status === "جدید").length}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">💵 سفارش نقدی</p>

          <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3 text-green-700">
            {dashboard.cashOrders}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl shadow p-3 sm:p-5 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">📝 سفارش اعتباری</p>

          <p className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3 text-blue-700">
            {dashboard.checkOrders}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow p-3 sm:p-5">
          <h3 className="font-bold text-sm sm:text-xl mb-2 sm:mb-3">🥇 پرفروش‌ترین برند</h3>

          <p className="text-green-700 font-bold">{dashboard.bestBrand}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-3 sm:p-5">
          <h3 className="font-bold text-sm sm:text-xl mb-2 sm:mb-3">🔥 پرفروش‌ترین محصول</h3>

          <p className="text-green-700 font-bold">{dashboard.bestProduct}</p>
        </div>
      </div>
    </section>
  );
}

export default OrderDashboard;
