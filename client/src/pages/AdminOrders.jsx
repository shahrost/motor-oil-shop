import * as XLSX from "xlsx";
import { useEffect, useState, useMemo } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("همه");

  const statuses = [
    "جدید",
    "تماس گرفته شد",
    "آماده ارسال",
    "ارسال شد",
    "تحویل شد",
  ];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = savedOrders.map((order) => ({
      ...order,

      status: order.status || "جدید",

      items: order.items || [
        {
          productName: order.productName,
          brand: order.brand,
          viscosity: order.viscosity,
          volume: order.volume,
          quantity: order.quantity,
          orderType: order.orderType,
          paymentType: order.paymentType,
          totalCount: order.totalCount,
          price: order.price,
        },
      ],
    }));

    setOrders(updatedOrders);
  }, []);

  function saveOrders(newOrders) {
    setOrders(newOrders);

    localStorage.setItem("orders", JSON.stringify(newOrders));
  }

  function deleteOrder(id) {
    const newOrders = orders.filter((order) => order.id !== id);

    saveOrders(newOrders);
  }

  function exportOrders() {
    if (orders.length === 0) {
      alert("سفارشی برای خروجی گرفتن وجود ندارد");
      return;
    }

    const excelData = [];

    orders.forEach((order) => {
      order.items.forEach((item) => {
        excelData.push({
          "شماره سفارش": order.id,

          "تاریخ ثبت": order.date,

          "نام مشتری": order.customer?.name || "",

          "شماره موبایل": order.customer?.phone || "",

          منطقه: order.customer?.area || "",

          "آدرس دقیق": order.customer?.address || "",

          محصول: item.productName,

          برند: item.brand,

          گرید: item.viscosity,

          حجم: item.volume,

          "نوع خرید": item.orderType === "carton" ? "کارتن" : "عدد",

          "نوع پرداخت": item.paymentType === "check" ? "چکی ۳ ماهه" : "نقدی",

          تعداد: item.quantity,

          "تعداد نهایی": item.totalCount,

          "قیمت واحد": item.price,

          "جمع این کالا": item.price * item.totalCount,

          "جمع کل سفارش": order.totalPrice,

          "وضعیت سفارش": order.status,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "سفارش‌ها");

    XLSX.writeFile(workbook, "orders.xlsx");
  }
  function changeStatus(id, status) {
    const newOrders = orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          status,
        };
      }

      return order;
    });

    saveOrders(newOrders);
  }

  function statusColor(status) {
    if (status === "جدید") return "bg-yellow-200";

    if (status === "تماس گرفته شد") return "bg-blue-200";

    if (status === "آماده ارسال") return "bg-orange-200";

    if (status === "ارسال شد") return "bg-green-200";

    if (status === "تحویل شد") return "bg-gray-300";

    return "bg-white";
  }

  const filteredOrders = orders
    .filter((order) => {
      const text = search.toLowerCase();

      const productsText = order.items
        ?.map((item) => item.productName)
        .join(" ")
        .toLowerCase();

      const searchMatch =
        order.customer?.name?.toLowerCase().includes(text) ||
        order.customer?.phone?.includes(text) ||
        order.customer?.area?.toLowerCase().includes(text) ||
        productsText?.includes(text);

      const statusMatch =
        filterStatus === "همه" || order.status === filterStatus;

      return searchMatch && statusMatch;
    })
    .reverse();

  const dashboard = useMemo(() => {
    let totalSales = 0;

    let totalProducts = 0;

    let cashOrders = 0;

    let checkOrders = 0;

    let cashSales = 0;

    let checkSales = 0;

    let brandCount = {};

    let productCount = {};

    orders.forEach((order) => {
      totalSales += Number(order.totalPrice || 0);

      let hasCash = false;

      let hasCheck = false;

      order.items?.forEach((item) => {
        totalProducts += Number(item.totalCount || 0);

        if (item.paymentType === "cash") {
          hasCash = true;
        }

        if (item.paymentType === "check") {
          hasCheck = true;
        }

        if (item.brand) {
          brandCount[item.brand] =
            (brandCount[item.brand] || 0) + Number(item.totalCount || 0);
        }

        if (item.productName) {
          productCount[item.productName] =
            (productCount[item.productName] || 0) +
            Number(item.totalCount || 0);
        }
      });

      // محاسبه مبلغ نقدی و چکی هر سفارش
      if (hasCash) {
        cashOrders++;

        cashSales += Number(order.totalPrice || 0);
      }

      if (hasCheck) {
        checkOrders++;

        checkSales += Number(order.totalPrice || 0);
      }
    });

    const bestBrand = Object.entries(brandCount).sort((a, b) => b[1] - a[1])[0];

    const bestProduct = Object.entries(productCount).sort(
      (a, b) => b[1] - a[1],
    )[0];

    return {
      totalSales,

      totalProducts,

      cashOrders,

      checkOrders,

      cashSales,

      checkSales,

      bestBrand: bestBrand ? bestBrand[0] : "ندارد",

      bestProduct: bestProduct ? bestProduct[0] : "ندارد",
    };
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          سفارش‌های ثبت شده
        </h1>

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
            <p className="font-bold text-gray-600">📝 سفارش چکی</p>

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
        <button
          onClick={exportOrders}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold mb-6"
        >
          📥 خروجی اکسل سفارش‌ها
        </button>

        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو نام، موبایل، منطقه یا محصول..."
            className="border p-3 rounded-lg w-full mb-4"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-3 rounded-lg w-full"
          >
            <option value="همه">همه سفارش‌ها</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-xl font-bold text-gray-600">سفارشی پیدا نشد</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`rounded-xl shadow p-6 ${statusColor(order.status)}`}
              >
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold">سفارش #{order.id}</h2>

                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    حذف
                  </button>
                </div>

                <div className="mb-5">
                  <b>وضعیت سفارش:</b>

                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                    className="mr-3 p-2 rounded-lg border"
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
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
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
                    <h3 className="font-bold text-lg mb-3">🛒 محصولات سفارش</h3>

                    <div className="space-y-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-xl p-4 bg-gray-50"
                        >
                          <p>
                            <b>محصول:</b> {item.productName}
                          </p>

                          <p className="mt-2">
                            <b>برند:</b> {item.brand}
                          </p>

                          <p className="mt-2">
                            <b>گرید:</b> {item.viscosity}
                          </p>

                          <p className="mt-2">
                            <b>حجم:</b> {item.volume}
                          </p>

                          <p className="mt-2">
                            <b>نوع خرید:</b>{" "}
                            {item.orderType === "carton" ? "کارتن" : "عدد"}
                          </p>

                          <p
                            className={
                              item.paymentType === "cash"
                                ? "mt-2 text-green-700 font-bold"
                                : "mt-2 text-blue-700 font-bold"
                            }
                          >
                            <b>پرداخت:</b>{" "}
                            {item.paymentType === "check"
                              ? "📝 چکی ۳ ماهه"
                              : "💵 نقدی"}
                          </p>

                          <p className="mt-2">
                            <b>تعداد:</b> {item.quantity}
                          </p>

                          <p className="mt-2">
                            <b>تعداد نهایی:</b> {item.totalCount} عدد
                          </p>

                          <p className="mt-2">
                            <b>قیمت واحد:</b>{" "}
                            {Number(item.price || 0).toLocaleString()}
                            تومان
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-100 rounded-xl p-4 mt-5">
                      <p className="text-xl font-bold text-green-700">
                        مبلغ کل سفارش:{" "}
                        {Number(order.totalPrice || 0).toLocaleString()}
                        تومان
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 bg-white/70 rounded-lg p-4">
                  <p className="text-green-700 font-bold text-xl">
                    مبلغ کل سفارش: {order.totalPrice?.toLocaleString()}
                    تومان
                  </p>
                </div>

                <p className="text-gray-600 mt-4 text-sm">
                  تاریخ ثبت: {order.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
