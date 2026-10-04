// بدون تخفیف، نشان نمایش داده نمی‌شه ولی جاش حفظ می‌شه تا ارتفاع کارت‌ها یکسان بمونه
function DiscountBadge({ percent = 0, className = "" }) {
  return (
    <span
      aria-hidden={percent > 0 ? undefined : true}
      className={`inline-block bg-rose-600 text-white text-[10px] leading-none font-extrabold px-2 py-1 rounded-full ${percent > 0 ? "" : "invisible"} ${className}`}
    >
      {percent}%
    </span>
  );
}

export default DiscountBadge;
