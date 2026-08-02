const {
  getAllProducts,
  saveProducts,
} = require("../repositories/productRepository");

const Product = require("../models/Product");

// دریافت همه محصولات
async function getProducts(req, res) {
  try {
    const products = await getAllProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ساخت محصول جدید
async function createProduct(req, res) {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// ویرایش محصول
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// حذف یک محصول
async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// حذف همه محصولات
async function deleteAllProducts(req, res) {
  try {
    await Product.deleteMany({});

    res.json({
      message: "All products deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
