const productRoutes = require("./productRoutes");
const vehicleRoutes = require("./vehicleRoutes");
const vehicleReviewRoutes = require("./vehicleReviewRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const customerRoutes = require("./customerRoutes");
const { getSitemap } = require("../controllers/sitemapController");

function routes(app) {
  // نقشه‌ی سایت پویا (محصولات و خودروها)؛ robots.txt سایت بهش اشاره می‌کنه
  app.get("/sitemap-dynamic.xml", getSitemap);

  app.use("/api/products", productRoutes);

  app.use("/api/vehicles", vehicleRoutes);

  app.use("/api/vehicle-reviews", vehicleReviewRoutes);

  app.use("/api/orders", orderRoutes);

  app.use("/api/auth", authRoutes);

  app.use("/api/customers", customerRoutes);
}

module.exports = routes;
