import { ArrowLeft } from "lucide-react";

// دکمه‌ی نمایشی ته کارت‌های دسترسی سریع (خود کارت لینکه؛ این فقط نشون می‌ده قابل‌کلیکه)
function EntryCta({ label, className = "" }) {
  return (
    <div className={`mt-auto flex w-full justify-center pt-3 sm:pt-5 ${className}`}>
      <span
        className="inline-flex h-10 w-44 max-w-full shrink-0 items-center justify-center gap-1 whitespace-nowrap bg-yellow-400 group-hover:bg-yellow-300 text-gray-950 text-sm font-bold px-3.5 rounded-full shadow-sm transition"
      >
        {label}
        <ArrowLeft size={16} className="shrink-0 ltr:rotate-180" />
      </span>
    </div>
  );
}

export default EntryCta;
