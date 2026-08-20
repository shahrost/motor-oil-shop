function formatPrice(price, language = "fa") {
  const amount = Number(price).toLocaleString("en-US");

  return language === "en" ? `${amount} Toman` : `${amount} تومان`;
}

export default formatPrice;
