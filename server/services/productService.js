const mongoose = require("mongoose");
const productRepository =require("../repositories/productRepository");
const validateProduct = require("../validations/productValidation");
const AppError = require("../utils/AppError");
const { removeProductImages, removeUploadedImage } = require("../utils/removeUploadedImage");
const { persistImage } = require("../utils/cloudStorage");


async function getProducts() {

  return await productRepository.getAllProducts();

}



function parsePromotion(data) {
  if (typeof data.promotion === "string") {
    try {
      data.promotion = JSON.parse(data.promotion);
    } catch {
      delete data.promotion;
    }
  }
}

async function createProduct(data, file) {

  parsePromotion(data);

  const validation = validateProduct(data);


  if (!validation.valid) {

    throw new AppError(
      validation.errors.join(" - "),
      400
    );

  }



  let uploadedMain = "";

  if (file) {

    uploadedMain = await persistImage(file);

    data.image = {
      main: uploadedMain,
      gallery: [],
    };

  }



  const twin = await productRepository.findDuplicate({
    brand: data.brand,
    name: data.name,
    category: data.category || "",
    volume: data.volume || "",
    viscosity: data.viscosity || "",
    api: data.api || "",
    description: data.description || "",
  });

  if (twin) {
    removeUploadedImage(uploadedMain);

    throw new AppError(
      `این محصول قبلاً ثبت شده است${twin.sku ? ` (کد ${twin.sku})` : ""}`,
      409
    );
  }

  return await productRepository.createProduct(data);

}




async function updateProduct(id, data, file) {

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("شناسه محصول نامعتبر است", 400);
  }

  parsePromotion(data);

  const validation = validateProduct(data);


  if (!validation.valid) {

    throw new AppError(
      validation.errors.join(" - "),
      400
    );

  }



  let previousImages = null;

  if (file) {

    const existing = await productRepository.getProductById(id);

    if (!existing) {
      throw new AppError("محصول یافت نشد", 404);
    }

    previousImages = existing.image;

    data.image = {
      main: await persistImage(file),
      gallery: [],
    };

  }



  const product =await productRepository.updateProduct(
    id,
    data
  );

  if (!product) {
    throw new AppError("محصول یافت نشد", 404);
  }

  if (previousImages) {
    removeProductImages(previousImages);
  }

  return product;

}




async function deleteProduct(id) {

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("شناسه محصول نامعتبر است", 400);
  }

  const product = await productRepository.deleteProduct(id);

  if (!product) {
    throw new AppError("محصول یافت نشد", 404);
  }

  removeProductImages(product.image);

  return product;

}




async function deleteAllProducts() {

  return await productRepository.deleteAllProducts();

}



module.exports = {

  getProducts,

  createProduct,

  updateProduct,

  deleteProduct,

  deleteAllProducts,

};