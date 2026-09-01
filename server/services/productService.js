const mongoose = require("mongoose");
const productRepository = require("../repositories/productRepository");
const validateProduct = require("../validations/productValidation");
const AppError = require("../utils/AppError");
const { removeProductImages } = require("../utils/removeUploadedImage");


async function getProducts() {

  return await productRepository.getAllProducts();

}



async function createProduct(data, file) {


  const validation = validateProduct(data);


  if (!validation.valid) {

    throw new AppError(
      validation.errors.join(" - "),
      400
    );

  }



  if (file) {

    data.image = {
      main: `/uploads/products/${file.filename}`,
      gallery: [],
    };

  }



  return await productRepository.createProduct(data);

}




async function updateProduct(id, data, file) {

  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("شناسه محصول نامعتبر است", 400);
  }

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
      main: `/uploads/products/${file.filename}`,
      gallery: [],
    };

  }



  const product = await productRepository.updateProduct(
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