// لیست ردیف‌های یک نتیجه (حذف‌شده‌ها، ردیف‌های ناموفق و ...)؛ لیست خالی نمایش داده نمی‌شه
function ResultList({ title, items, renderItem, tone = "text-red-600" }) {
  if (!items?.length) return null;

  return (
    <div className="mt-2">
      <p className={tone}>{title}</p>
      <ul className="list-disc pr-5">
        {items.map((item, i) => (
          <li key={item.sku || item.row || i}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultList;
