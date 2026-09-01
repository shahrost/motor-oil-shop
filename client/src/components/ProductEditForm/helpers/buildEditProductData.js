function buildEditProductData(product) {
  return {
    ...product,
    price: Number(product.price || 0),
    cartonCount: Number(product.cartonCount || 0),

    promotion: {
      isActive: Boolean(product.promotion?.isActive),
      buyQty: Number(product.promotion?.buyQty || 0),
      giftQtyCash: Number(product.promotion?.giftQtyCash || 0),
      giftQtyCheck: Number(product.promotion?.giftQtyCheck || 0),
      note: product.promotion?.note || "",
    },
  };
}

export default buildEditProductData;
