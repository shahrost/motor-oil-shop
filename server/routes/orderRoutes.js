const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
} = require("../controllers/orderController");

// دریافت همه سفارش‌ها
router.get("/", auth, getOrders);

// ثبت سفارش جدید
router.post("/", createOrder);

// تغییر وضعیت سفارش
router.put("/:id", auth, updateOrderStatus);

// حذف یک سفارش
router.delete("/:id", auth, deleteOrder);

// حذف همه سفارش‌ها
router.delete("/", auth, deleteAllOrders);

module.exports = router;
