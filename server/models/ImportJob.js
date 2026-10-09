const mongoose = require("mongoose");

// وضعیت job ایمپورت گروهی. در دیتابیس نگه داشته می‌شه (نه حافظه‌ی پروسه) چون روی هاست
// ممکنه هم‌زمان چند نسخه از سرور بالا باشه (مثلاً موقع ری‌استارت) و درخواست وضعیت به
// نسخه‌ای برسه که ایمپورت رو شروع نکرده.
const ImportJobSchema = new mongoose.Schema(
  {
    _id: { type: String },

    label: { type: String, default: "" },

    status: {
      type: String,
      enum: ["running", "done", "error"],
      default: "running",
    },

    stage: { type: String, default: "" },

    results: { type: mongoose.Schema.Types.Mixed, default: null },

    error: { type: String, default: "" },

    // نسخه‌ی سروری که job رو اجرا می‌کنه مرتب این رو تازه می‌کنه؛ کهنه‌شدنش یعنی اون نسخه از بین رفته
    heartbeatAt: { type: Date, default: Date.now },

    // بعد از یک ساعت خودکار پاک می‌شه
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 },
  },
  { versionKey: false, minimize: false },
);

module.exports = mongoose.model("ImportJob", ImportJobSchema);
