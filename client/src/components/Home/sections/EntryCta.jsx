import { ArrowLeft } from "lucide-react";

// دکمه‌ی نمایشی ته کارت‌های دسترسی سریع (خود کارت لینکه؛ این فقط نشون می‌ده قابل‌کلیکه)
function EntryCta({ label, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap bg-yellow-400 group-hover:bg-yellow-300 text-gray-950 text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm transition ${className}`}
    >
      {label}
      <ArrowLeft size={16} className="ltr:rotate-180" />
    </span>
  );
}

export default EntryCta;
