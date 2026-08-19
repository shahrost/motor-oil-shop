function buildEditProductData(product) {
  return {
    ...product,
    price: Number(product.price || 0),
    cartonCount: Number(product.cartonCount || 0),
  };
}

export default buildEditProductData;
