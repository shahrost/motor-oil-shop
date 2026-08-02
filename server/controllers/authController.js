const bcrypt = require("bcrypt");

const { createToken } = require("../middleware/auth");

async function login(req, res) {
  const { username, password } = req.body;

  const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
  const admin = {
    username: process.env.ADMIN_USERNAME,
  };

  if (username !== admin.username) {
    return res.status(401).json({
      message: "نام کاربری یا رمز عبور اشتباه است",
    });
  }

  const isValidPassword = await bcrypt.compare(password, PASSWORD_HASH);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "نام کاربری یا رمز عبور اشتباه است",
    });
  }

  const token = createToken(admin);

  res.json({
    token,
  });
}

module.exports = {
  login,
};
