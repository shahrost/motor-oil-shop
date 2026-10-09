// ابزارهای مشترک انیمیشن‌های کارت‌های صفحه‌ی اصلی

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function play(el, keyframes, options) {
  try {
    await el.animate(keyframes, { fill: "forwards", ...options }).finished;
  } catch {
    // انیمیشن با unmount یا اجرای دوباره لغو شد
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// callback فقط یک بار، وقتی نصف المان دیده بشه؛ خروجی: تابع لغو
export function onceVisible(el, callback) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    callback();
  }, { threshold: 0.5 });
  observer.observe(el);

  return () => observer.disconnect();
}
