const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const startProcessMonitor = require("./utils/processMonitor");
const productRepository = require("./repositories/productRepository");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

startProcessMonitor();

connectDB();

// لیست محصولات از همان ابتدا در کش آماده می‌شود تا اولین بازدیدکننده منتظر دیتابیس نماند
mongoose.connection.once("open", () => {
  productRepository
    .getAllProducts()
    .catch((error) => console.error("Product cache warm-up failed:", error.message));
});

const app = express();

// Middlewares
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// پاسخ‌های JSON (لیست محصولات/خودروها) چند صد کیلوبایتن؛ gzip حجمشون رو حدود ۱۰ برابر کم می‌کنه
app.use(compression());

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

// ایمپورت خودرو JSON حجیم‌تری می‌فرسته و parser اختصاصی خودش (limit بزرگ‌تر) رو داره
const jsonParser = express.json();

app.use((req, res, next) => {
  if (req.path === "/api/vehicles/import-parsed") return next();

  return jsonParser(req, res, next);
});

// اسم فایل‌های آپلودی یکتاست و عوض نمی‌شن، پس مرورگر می‌تونه طولانی کش کنه
app.use(
  "/uploads",
  express.static("uploads", { maxAge: "30d", immutable: true }),
);
app.use("/templates", express.static("templates"));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "تعداد تلاش‌های ورود بیش از حد مجاز است، بعداً دوباره تلاش کنید",
  },
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/customers/login", loginLimiter);
app.use("/api/customers/register", loginLimiter);

// Test API
app.get("/", (req, res) => {
  res.send("Shahram Roghan API is running");
});

// Routes
routes(app);

// Error Handler (باید آخر باشد)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
