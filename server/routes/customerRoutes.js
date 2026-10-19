const express = require("express");
const router = express.Router();

const { customerAuth } = require("../middleware/customerAuth");
const {
  register,
  login,
  getMe,
  getMyOrders,
  addFavorite,
  removeFavorite,
} = require("../controllers/customerController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", customerAuth, getMe);
router.get("/me/orders", customerAuth, getMyOrders);
router.put("/me/favorites/:productId", customerAuth, addFavorite);
router.delete("/me/favorites/:productId", customerAuth, removeFavorite);

module.exports = router;
