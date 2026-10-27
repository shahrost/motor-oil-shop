// فلش «بکش» روی کارت سوم در موبایل، وقتی ردیف بیشتر از سه کارت داره؛
// کامل داخل کادر کارت (left-1) تا لبه‌ی ردیف اسکرولی نصفش رو نبره
function SwipeHint() {
  return (
    <span
      className="
        sm:hidden
        pointer-events-none
        absolute
        top-10
        left-1
        z-10
        flex
        items-center
        justify-center
        w-7
        h-7
        rounded-full
        bg-black/60
        text-white
        text-sm
        shadow-lg
        animate-pulse
      "
    >
      ‹
    </span>
  );
}

export default SwipeHint;
