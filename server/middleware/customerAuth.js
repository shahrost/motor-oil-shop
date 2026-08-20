const jwt = require("jsonwebtoken");

function customerAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "دسترسی غیرمجاز",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "customer") {
      return res.status(401).json({
        message: "توکن نامعتبر است",
      });
    }

    req.customerId = decoded.customerId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "توکن نامعتبر است",
    });
  }
}

function createCustomerToken(customer) {
  return jwt.sign(
    {
      customerId: customer._id.toString(),
      role: "customer",
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "30d",
    },
  );
}

module.exports = {
  customerAuth,
  createCustomerToken,
};
