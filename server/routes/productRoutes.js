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
const {
  uploadImagesBatch,
  getImportStatus,
} = require("../controllers/importController");

// دریافت همه محصولات
router.get("/", getProducts);

// ساخت محصول
router.post("/", auth, upload.single("image"), createProduct);
// ویرایش محصول
router.put("/:id", auth, upload.single("image"), updateProduct);

// آپلود دسته‌ای عکس محصولات (قبل از ایمپورت)
router.post(
  "/images",
  auth,
  importUpload.fields([{ name: "images", maxCount: 100 }]),
  uploadImagesBatch,
);

// وضعیت ایمپورت در حال اجرا
router.get("/import/:jobId", auth, getImportStatus);

// ایمپورت گروهی محصولات (اکسل + عکس‌های آپلودشده)
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
