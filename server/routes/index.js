const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");

function routes(app) {
  app.use("/api/products", productRoutes);

  app.use("/api/orders", orderRoutes);

  app.use("/api/auth", authRoutes);
}

module.exports = routes;
