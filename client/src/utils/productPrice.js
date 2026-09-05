export function getProductPrice(product, paymentType) {
  if (paymentType === "check") {
    return Number(product?.priceCheck || product?.price || 0);
  }

  return Number(product?.price || 0);
}

export default getProductPrice;
