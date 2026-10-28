import { getItem, setItem, removeItem } from "./safeStorage";

const STORAGE_KEY = "cart";

// سبدهای قدیمی عکس رو به‌صورت رشته ذخیره کرده بودن؛ به ساختار فعلی { main, gallery } تبدیل می‌شن
function normalizeItem(item) {
  const image =
    typeof item.image === "string"
      ? { main: item.image, gallery: [] }
      : { main: item.image?.main || "", gallery: item.image?.gallery || [] };

  return { ...item, image };
}

export function getCart() {
  try {
    const saved = JSON.parse(getItem(STORAGE_KEY) || "[]");

    return Array.isArray(saved) ? saved.map(normalizeItem) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function clearCartStorage() {
  removeItem(STORAGE_KEY);
}
