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
