import buildPromotionData from "../../../utils/buildPromotionData";

function buildProductData(product) {
  return {
    name: `${product.brand || ""} ${product.viscosity || ""} ${product.volume || ""}`.trim(),

    brand: product.brand || "",
    category: product.category || "",
    volume: product.volume || "",
    viscosity: product.viscosity || "",

    api: product.api || "",
    acea: product.acea || "",
    oilType: product.oilType || "",

    description: product.description || "",

    price: Number(product.price || 0),
    priceCheck: Number(product.priceCheck || 0),
    cartonCount: Number(product.cartonCount || 0),

    stock: Number(product.stock || 0),

    isBestSeller: Boolean(product.isBestSeller),
    isActive: Boolean(product.isActive),

    promotion: buildPromotionData(product.promotion),

    image: product.image || null,
  };
}

export default buildProductData;
