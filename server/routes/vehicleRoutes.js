const express = require("express");
const importUpload = require("../middleware/importUpload");
const { auth } = require("../middleware/auth");
const {
  getVehicles,
  importVehicles,
} = require("../controllers/vehicleController");

const router = express.Router();

// دریافت همه خودروها
router.get("/", getVehicles);

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

module.exports = router;
