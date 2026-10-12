const express = require("express");
const { auth } = require("../middleware/auth");
const reviewLimiter = require("../middleware/reviewLimiter");
const {
  getVehicleReviews,
  addReview,
  getReviewsForAdmin,
  approveReview,
  deleteReview,
} = require("../controllers/vehicleReviewController");

const router = express.Router();

// عمومی: خلاصه‌ی امتیاز + نظرهای تأییدشده‌ی یک خودرو، و ثبت امتیاز/نظر
router.get("/vehicle/:vehicleId", getVehicleReviews);
router.post("/vehicle/:vehicleId", reviewLimiter, addReview);

// ادمین: مدیریت نظرها (?status=pending|approved|all)
router.get("/", auth, getReviewsForAdmin);
router.patch("/:id/approve", auth, approveReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;
