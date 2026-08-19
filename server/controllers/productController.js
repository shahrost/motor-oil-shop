const productService = require("../services/productService");
const apiResponse = require("../utils/apiResponse");

async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts();

    return apiResponse.success(res, products);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body, req.file);

    return apiResponse.created(res, product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.file,
    );

    return apiResponse.success(res, product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);

    return apiResponse.success(res, null, "محصول حذف شد");
  } catch (error) {
    next(error);
  }
}

async function deleteAllProducts(req, res, next) {
  try {
    await productService.deleteAllProducts();

    return apiResponse.success(res, null, "تمام محصولات حذف شدند");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,

  createProduct,

  updateProduct,

  deleteProduct,

  deleteAllProducts,
};
