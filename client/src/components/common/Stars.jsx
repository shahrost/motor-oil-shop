const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

export function StarShape({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

// نمایش امتیاز با ۵ ستاره (اعشار هم: ۴.۳ ← ستاره‌ی پنجم ۳۰٪ پر). پر شدن از
// سمت شروع متن است (در فارسی از راست). size = کلاس اندازه‌ی هر ستاره
function Stars({ value = 0, size = "w-4 h-4", label }) {
  return (
    <span role="img" aria-label={label} className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.max(0, Math.min(1, value - index));

        return (
          <span key={index} className={`relative inline-block ${size}`}>
            <StarShape className={`absolute inset-0 text-gray-300 dark:text-gray-600 ${size}`} />

            {fill > 0 && (
              <span
                className="absolute inset-y-0 start-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <StarShape className={`text-yellow-400 ${size}`} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export default Stars;
