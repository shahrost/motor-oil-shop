const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/auth");
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
router.post("/", auth, createProduct);

// ویرایش محصول
router.put("/:id", auth, updateProduct);

// حذف یک محصول
router.delete("/:id", auth, deleteProduct);

// حذف همه محصولات
router.delete("/", auth, deleteAllProducts);

module.exports = router;
