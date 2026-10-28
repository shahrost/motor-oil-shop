// کلید چندحالته‌ی کوچیک (مثل «عدد | کارتن» یا «نقدی | چکی») به‌جای <select>.
// options: [{ value, label, disabled }]؛ گزینه‌ی غیرفعال قابل انتخاب نیست (مثل روش پرداخت بی‌قیمت).
// گزینه‌ی انتخاب‌شده کهربایی تا در حالت روز و شب واضح باشه
function SegmentedControl({ options, value, onChange, ariaLabel, className = "" }) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`grid grid-flow-col auto-cols-fr gap-0.5 rounded-lg bg-gray-100 border border-gray-200 p-0.5 ${className}`}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={`h-7 min-w-0 truncate rounded-md px-1 text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed ${
              selected
                ? "bg-yellow-400 text-gray-950 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
