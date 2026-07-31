const express = require("express");

const router = express.Router();

const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
} = require("../controllers/orderController");

// دریافت همه سفارش‌ها
router.get("/", getOrders);

// ثبت سفارش جدید
router.post("/", createOrder);

// تغییر وضعیت سفارش
router.put("/:id", updateOrderStatus);

// حذف یک سفارش
router.delete("/:id", deleteOrder);

// حذف همه سفارش‌ها
router.delete("/", deleteAllOrders);

module.exports = router;
