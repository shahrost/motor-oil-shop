import { Minus, Plus } from "lucide-react";

const BUTTON =
  "shrink-0 w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition";

// شمارنده‌ی «− ۱ +» تعداد خرید. عدد وسط هنوز تایپی‌ه (خرید عمده، مثلاً ۵۰)؛
// اعتبارسنجی همون setQuantity کارت‌هاست (usePurchaseOptions: صحیح ≥ ۱)
function QuantityStepper({ value, onChange, label, decreaseLabel, increaseLabel, className = "" }) {
  const number = Number(value) || 0;

  return (
    <div className={`flex items-center rounded-lg border border-[#cbd0d9] dark:border-[#5b6f91] overflow-hidden ${className}`}>
      <button
        type="button"
        aria-label={decreaseLabel}
        disabled={number <= 1}
        onClick={() => onChange(Math.max(1, number - 1))}
        className={BUTTON}
      >
        <Minus size={14} />
      </button>

      <input
        type="text"
        inputMode="numeric"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => value === "" && onChange(1)}
        className="min-w-0 flex-1 h-8 border-0 bg-transparent text-center text-sm font-bold text-gray-950 outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset"
      />

      <button
        type="button"
        aria-label={increaseLabel}
        onClick={() => onChange(number + 1)}
        className={BUTTON}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default QuantityStepper;
