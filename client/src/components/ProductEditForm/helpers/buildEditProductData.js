import buildPromotionData from "../../../utils/buildPromotionData";

function buildEditProductData(product) {
  return {
    ...product,
    price: Number(product.price || 0),
    priceCheck: Number(product.priceCheck || 0),
    cartonCount: Number(product.cartonCount || 0),

    promotion: buildPromotionData(product.promotion),
  };
}

export default buildEditProductData;
