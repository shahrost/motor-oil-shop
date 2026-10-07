const express = require("express");
const importUpload = require("../middleware/importUpload");
const { auth } = require("../middleware/auth");
const {
  getVehicles,
  getFilterCompatibility,
  importVehicles,
  importParsedVehicles,
} = require("../controllers/vehicleController");
const {
  uploadImagesBatch,
  getImportStatus,
} = require("../controllers/importController");

const router = express.Router();

// دریافت همه خودروها
router.get("/", getVehicles);

// خودروهای سازگار هر فیلتر (فقط نام‌ها؛ سبک‌تر از لیست کامل خودروها)
router.get("/filter-compatibility", getFilterCompatibility);

// آپلود دسته‌ای عکس خودروها (قبل از ایمپورت)
router.post(
  "/images",
  auth,
  importUpload.fields([{ name: "images", maxCount: 100 }]),
  uploadImagesBatch,
);

// ایمپورت گروهی خودروها (اکسل + عکس‌ها)
router.post(
  "/import",
  auth,
  importUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "images", maxCount: 1500 },
  ]),
  importVehicles,
);

// ایمپورت از داده‌ی آماده (JSON) — اکسل توی مرورگر پردازش می‌شه
router.post(
  "/import-parsed",
  auth,
  express.json({ limit: "10mb" }),
  importParsedVehicles,
);

// وضعیت ایمپورت در حال اجرا
router.get("/import/:jobId", auth, getImportStatus);

module.exports = router;
