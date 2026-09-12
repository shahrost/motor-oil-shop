function DiscountBadge({ percent = 0, className = "" }) {
  return (
    <span
      className={`inline-block bg-red-600 text-white text-[10px] leading-none font-extrabold px-1.5 py-1 rounded-md ${className}`}
    >
      {percent}%
    </span>
  );
}

export default DiscountBadge;
