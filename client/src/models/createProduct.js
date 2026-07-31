import productModel from "./productModel";

function createProduct(data = {}) {
  return {
    ...productModel,

    ...data,

    id: data.id ?? Date.now(),

    name:
      data.name ||
      `${data.brand || ""} ${data.viscosity || ""} ${data.volume || ""}`.trim(),

    price: Number(data.price || 0),

    cartonCount: Number(data.cartonCount || 0),

    stock: Number(data.stock || 0),

    image:
      typeof data.image === "string"
        ? {
            main: data.image,
            gallery: [],
          }
        : {
            main: data.image?.main || "",
            gallery: data.image?.gallery || [],
          },
  };
}

export default createProduct;
