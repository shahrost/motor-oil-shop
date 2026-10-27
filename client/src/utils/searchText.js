import { toLatinDigits } from "./digits";

// یکسان‌سازی متن برای جستجو تا «پراید»/«Pride»، «۱۴۱»/«141»، «كيا»/«کیا» و
// «سانگ‌یانگ»/«سانگ یانگ» یکی دیده بشن: حروف کوچک، ارقام فارسی/عربی ← انگلیسی،
// ي/ك عربی ← ی/ک فارسی، حذف اعراب و مد و همزه (آ ← ا، ë ← e)، حذف نیم‌فاصله،
// علامت‌ها ← فاصله (به‌جز ممیز اعشار: «۱٫۵» ← «1.5»)
export function normalizeSearchText(text) {
  return toLatinDigits(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ًͯ-ٰٟ]/g, "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/٫/g, ".")
    .replace(/‌/g, "")
    .replace(/[^\p{L}\p{N}.]+/gu, " ")
    .trim();
}

// کلمه‌های عبارت جستجو (یکسان‌شده)؛ عبارت خالی ← []
export function searchWords(search) {
  const text = normalizeSearchText(search);

  return text ? text.split(" ") : [];
}

export default normalizeSearchText;
