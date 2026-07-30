import productModel from "./productModel";

function createProduct(data = {}) {
  return {
    ...productModel,

    ...data,

    id: data.id || Date.now(),

    price: Number(data.price || 0),

    cartonCount: Number(data.cartonCount || 0),

    stock: Number(data.stock || 0),
  };
}

export default createProduct;
