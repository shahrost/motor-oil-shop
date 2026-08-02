const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;
// بررسی ورود ادمین

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "دسترسی غیرمجاز",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "توکن نامعتبر است",
    });
  }
}

function createToken(admin) {
  return jwt.sign(
    {
      username: admin.username,
    },
    SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );
}

module.exports = {
  auth,
  createToken,
};
