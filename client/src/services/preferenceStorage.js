import { getItem, setItem } from "./safeStorage";

// زبان و حالت روز/شب انتخابی کاربر

export function getSavedLanguage() {
  return getItem("language");
}

export function saveLanguage(language) {
  setItem("language", language);
}

// بدون انتخاب قبلی: حالت شب اگه گوشی/سیستم روی حالت تیره است
export function getSavedTheme() {
  const saved = getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function saveTheme(theme) {
  setItem("theme", theme);
}
