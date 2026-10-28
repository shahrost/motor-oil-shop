const express = require("express");

const router = express.Router();
const { auth } = require("../middleware/auth");
const { optionalCustomerAuth } = require("../middleware/customerAuth");
const orderLimiter = require("../middleware/orderLimiter");
const {
  getOrders,
  exportOrdersExcel,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
} = require("../controllers/orderController");

// دریافت همه سفارش‌ها
router.get("/", auth, getOrders);

// اکسل سفارش‌های یک ماه شمسی (فقط ادمین)
router.get("/export", auth, exportOrdersExcel);

// ثبت سفارش جدید (مهمان یا مشتری واردشده؛ شناسه‌ی مشتری فقط از توکن)
router.post("/", orderLimiter, optionalCustomerAuth, createOrder);

// تغییر وضعیت سفارش
router.put("/:id", auth, updateOrderStatus);

// حذف یک سفارش
router.delete("/:id", auth, deleteOrder);

// حذف همه سفارش‌ها
router.delete("/", auth, deleteAllOrders);

module.exports = router;
