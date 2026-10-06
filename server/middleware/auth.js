const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "دسترسی غیرمجاز",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // توکن مشتری هم با همین کلید امضا می‌شه؛ فقط توکنی که نقش ادمین داره قبوله
    if (decoded.role !== "admin") {
      return res.status(401).json({
        message: "توکن نامعتبر است",
      });
    }

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
      role: "admin",
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );
}

module.exports = {
  auth,

  createToken,
};
