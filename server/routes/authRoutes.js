const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/auth");
const { login, verify } = require("../controllers/authController");

router.post("/login", login);
router.get("/verify", auth, verify);

module.exports = router;
