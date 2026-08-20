const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const customerRoutes = require("./customerRoutes");

function routes(app) {
  app.use("/api/products", productRoutes);

  app.use("/api/orders", orderRoutes);

  app.use("/api/auth", authRoutes);

  app.use("/api/customers", customerRoutes);
}

module.exports = routes;
