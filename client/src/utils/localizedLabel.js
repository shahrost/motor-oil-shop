// برچسب یک آیتم داده (دسته، نوع، بازه‌ی قیمت و…) با فیلدهای label / labelEn
export default function localizedLabel(item, language) {
  return language === "en" ? item.labelEn : item.label;
}
