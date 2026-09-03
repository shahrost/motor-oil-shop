const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

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

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));
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

// deploy trigger: initial Liara deployment

// retry: npm registry override via env var

// retry: disable read-only fs for uploads dir

// retry: custom DNS for MongoDB Atlas SRV lookup
