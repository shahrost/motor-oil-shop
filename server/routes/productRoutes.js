const express = require("express");
const upload = require("../middleware/upload");
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
router.post("/", auth, upload.single("image"), createProduct);
// ویرایش محصول
router.put("/:id", auth, upload.single("image"), updateProduct);

// حذف یک محصول
router.delete("/:id", auth, deleteProduct);

// حذف همه محصولات
router.delete("/", auth, deleteAllProducts);

module.exports = router;
