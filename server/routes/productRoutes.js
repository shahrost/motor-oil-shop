const express = require("express");
const upload = require("../middleware/upload");
const importUpload = require("../middleware/importUpload");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
} = require("../controllers/productController");
const {
  importProducts,
  bulkUpdatePrices,
} = require("../controllers/productImportController");

// دریافت همه محصولات
router.get("/", getProducts);

// ساخت محصول
router.post("/", auth, upload.single("image"), createProduct);
// ویرایش محصول
router.put("/:id", auth, upload.single("image"), updateProduct);

// ایمپورت گروهی محصولات (اکسل + عکس‌ها)
router.post(
  "/import",
  auth,
  importUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "images", maxCount: 1500 },
  ]),
  importProducts,
);

// بروزرسانی گروهی قیمت‌ها
router.post(
  "/bulk-price-update",
  auth,
  importUpload.single("file"),
  bulkUpdatePrices,
);

// حذف یک محصول
router.delete("/:id", auth, deleteProduct);

// حذف همه محصولات
router.delete("/", auth, deleteAllProducts);

module.exports = router;
