const express = require("express");
const router = express.Router();

const { customerAuth } = require("../middleware/customerAuth");
const {
  register,
  login,
  getMe,
  getMyOrders,
} = require("../controllers/customerController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", customerAuth, getMe);
router.get("/me/orders", customerAuth, getMyOrders);

module.exports = router;
