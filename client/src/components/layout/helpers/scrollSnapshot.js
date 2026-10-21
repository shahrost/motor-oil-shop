// ردیف‌های افقی (مثل ردیف برندها) با data-scroll-row و کارت‌های محصول با data-product-id علامت خوردن
const ROW_SELECTOR = "[data-scroll-row]";
const MAX_WAIT_MS = 3000;
const USER_INPUT_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"];

// لود کامل صفحه با Back/Forward مرورگر (مثلاً بعد از رفرش صفحه‌ی محصول)؛ نه رفرش یا لینک تازه
export function isBackForwardPageLoad() {
  return performance.getEntriesByType?.("navigation")[0]?.type === "back_forward";
}

// جای فعلی اسکرول صفحه + اسکرول افقی هر ردیف
export function readScrollSnapshot() {
  const rows = {};

  document.querySelectorAll(ROW_SELECTOR).forEach((row) => {
    rows[row.dataset.scrollRow] = row.scrollLeft;
  });

  return { y: window.scrollY, rows };
}

function findProductCard(productId) {
  if (!productId) return null;

  return document.querySelector(`[data-product-id="${CSS.escape(productId)}"]`);
}

function isInView(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return (
    centerX > 0 &&
    centerX < window.innerWidth &&
    centerY > 0 &&
    centerY < window.innerHeight
  );
}

function applySnapshot(saved, card) {
  document.querySelectorAll(ROW_SELECTOR).forEach((row) => {
    const left = saved.rows?.[row.dataset.scrollRow];
    if (left != null) row.scrollLeft = left;
  });

  // instant: html در CSS سایت scroll-behavior: smooth داره؛ بازگردانی باید یک‌جا باشه
  window.scrollTo({ top: saved.y || 0, behavior: "instant" });

  // اگه کارت کلیک‌شده (مثلاً بعد از تغییر اندازه‌ی صفحه) دیده نمی‌شه، وسط صفحه بیاد
  if (card && !isInView(card)) {
    card.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  }
}

// صبر می‌کنه تا لیست رندر بشه (صفحه به اندازه‌ی کافی بلند بشه و کارت کلیک‌شده
// پیدا بشه) و بعد اسکرول رو برمی‌گردونه. اگه کاربر خودش اسکرول کنه دست نگه می‌داره.
// خروجی: تابع لغو
export function restoreScrollSnapshot(saved) {
  const startedAt = performance.now();
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    USER_INPUT_EVENTS.forEach((type) => window.removeEventListener(type, stop));
  };

  const attempt = () => {
    const card = findProductCard(saved.productId);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ready = maxScroll >= (saved.y || 0) && (!saved.productId || card);

    if (ready || performance.now() - startedAt > MAX_WAIT_MS) {
      applySnapshot(saved, card);
      stop();
      return;
    }

    frame = requestAnimationFrame(attempt);
  };

  USER_INPUT_EVENTS.forEach((type) =>
    window.addEventListener(type, stop, { passive: true }),
  );

  attempt();

  return stop;
}
