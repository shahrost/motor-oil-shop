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

    promotion: {
      isActive: Boolean(product.promotion?.isActive),
      buyQty: Number(product.promotion?.buyQty || 0),
      giftQtyCash: Number(product.promotion?.giftQtyCash || 0),
      giftQtyCheck: Number(product.promotion?.giftQtyCheck || 0),
      note: product.promotion?.note || "",
    },

    image: product.image || null,
  };
}

export default buildProductData;
