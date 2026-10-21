import ORDER_ROW_GRID from "../helpers/orderRowGrid";

const TITLES = ["نام مشتری", "شماره تماس", "تاریخ ثبت", "اقلام", "مبلغ کل", "پرداخت", "وضعیت", ""];

// سرستون‌های لیست فشرده (فقط دسکتاپ؛ روی موبایل هر ردیف برچسب خودش رو داره)
function OrderRowHeader() {
  return (
    <div
      className={`hidden md:grid ${ORDER_ROW_GRID} gap-3 px-4 border-r-8 border-transparent text-sm font-bold text-gray-600`}
    >
      {TITLES.map((title, index) => (
        <span key={index}>{title}</span>
      ))}
    </div>
  );
}

export default OrderRowHeader;
