const STORAGE_KEY = "lastOrder";

// آخرین سفارش ثبت‌شده‌ی مشتری روی همین مرورگر؛ تا بعد از خالی شدن سبد، در صفحه‌ی سبد خرید دیده بشه
export function getLastOrder() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

    return saved && Array.isArray(saved.items) ? saved : null;
  } catch {
    return null;
  }
}

export function saveLastOrder(order) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // حافظه‌ی مرورگر در دسترس نیست؛ فقط نمایش سفارش در سبد از دست می‌ره
  }
}

export function clearLastOrder() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // نادیده
  }
}
