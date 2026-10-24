// یک formatter مشترک؛ toLocaleString هر بار یکی تازه می‌سازه و روی لیست بلند محصولات کند بود
const numberFormat = new Intl.NumberFormat("en-US");

function formatPrice(price, language = "fa") {
  const amount = numberFormat.format(Number(price));

  return language === "en" ? `${amount} Toman` : `${amount} تومان`;
}

export default formatPrice;
