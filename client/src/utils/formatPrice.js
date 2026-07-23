function formatPrice(price) {
  return Number(price).toLocaleString("en-US") + " تومان";
}

export default formatPrice;