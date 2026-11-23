import { ArrowDown, ArrowUp } from "lucide-react";

function scrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

export default function AdminScrollButtons() {
  const button = "flex size-12 items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-600";

  return (
    <nav aria-label="جابجایی سریع در پنل مدیریت"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-3 z-40 flex flex-col gap-3 sm:left-6">
      <button type="button" aria-label="رفتن به بالای صفحه" title="رفتن به بالای صفحه"
        onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
        className={`${button} bg-gray-900 text-white hover:bg-gray-700`}>
        <ArrowUp size={24} aria-hidden="true" />
      </button>
      <button type="button" aria-label="رفتن به نظرات پایین صفحه" title="رفتن به نظرات پایین صفحه" aria-controls="admin-reviews"
        onClick={() => document.getElementById("admin-reviews")?.scrollIntoView({ block: "start", behavior: scrollBehavior() })}
        className={`${button} bg-yellow-400 text-gray-950 hover:bg-yellow-500`}>
        <ArrowDown size={24} aria-hidden="true" />
      </button>
    </nav>
  );
}
