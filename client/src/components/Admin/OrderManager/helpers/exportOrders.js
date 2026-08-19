import * as XLSX from "xlsx";

function exportOrders(orders) {
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

        "واحد خرید": item.orderType === "carton" ? "کارتن" : "عدد",

        "نوع پرداخت": item.paymentType === "check" ? "اعتباری" : "نقدی",

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

export default exportOrders;
