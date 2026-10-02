const express = require("express");
const importUpload = require("../middleware/importUpload");
const { auth } = require("../middleware/auth");
const {
  getVehicles,
  importVehicles,
  importParsedVehicles,
  getImportStatus,
  uploadVehicleImages,
} = require("../controllers/vehicleController");

const router = express.Router();

// دریافت همه خودروها
router.get("/", getVehicles);

// آپلود دسته‌ای عکس خودروها (قبل از ایمپورت)
router.post(
  "/images",
  auth,
  importUpload.fields([{ name: "images", maxCount: 100 }]),
  uploadVehicleImages,
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
