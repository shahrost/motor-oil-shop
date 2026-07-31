const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = require("../controllers/productController");

// دریافت همه محصولات
router.get("/", getProducts);

// ساخت محصول
router.post("/", createProduct);

// ویرایش محصول
router.put("/:id", updateProduct);

// حذف یک محصول
router.delete("/:id", deleteProduct);

// حذف همه محصولات
router.delete("/", deleteAllProducts);

module.exports = router;
