// یک formatter مشترک برای هر زبان؛ toLocaleString هر بار یکی تازه می‌سازه و روی لیست بلند محصولات کند بود.
// فارسی: ارقام فارسی با جداکننده‌ی هزارگان (۱٬۲۵۰٬۰۰۰ تومان)، انگلیسی: 1,250,000 Toman
const formatters = {
  fa: new Intl.NumberFormat("fa-IR"),
  en: new Intl.NumberFormat("en-US"),
};

function formatPrice(price, language = "fa") {
  const amount = (formatters[language] || formatters.fa).format(Number(price));

  return language === "en" ? `${amount} Toman` : `${amount} تومان`;
}

export default formatPrice;
