// جای اسکرول هر صفحه‌ی تاریخچه (کلید = location.key روتر) تا با Back همون‌جا برگرده.
// sessionStorage: با بستن تب پاک می‌شه و بین تب‌ها مشترک نیست
const STORAGE_KEY = "scrollMemory";
const MAX_ENTRIES = 50;

// اولین صفحه‌ی هر تب کلید "default" داره؛ آدرس کنارش میاد تا صفحه‌های مختلف قاطی نشن
export function scrollMemoryKey({ key, pathname, search }) {
  return key === "default" ? `default:${pathname}${search}` : key;
}

function readAll() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function getScrollMemory(key) {
  return readAll()[key] || null;
}

// changes با مقدار قبلی ادغام می‌شه (مثلاً productId با اسکرول بعدی پاک نشه)
export function saveScrollMemory(key, changes) {
  const all = readAll();

  all[key] = { ...all[key], ...changes, savedAt: Date.now() };

  // فقط جدیدترین‌ها می‌مونن تا حافظه بی‌نهایت بزرگ نشه
  const keys = Object.keys(all);
  if (keys.length > MAX_ENTRIES) {
    keys
      .sort((a, b) => all[a].savedAt - all[b].savedAt)
      .slice(0, keys.length - MAX_ENTRIES)
      .forEach((oldKey) => delete all[oldKey]);
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // حالت خصوصی / حافظه‌ی پر: بازگردانی اسکرول فقط کار نمی‌کنه
  }
}
