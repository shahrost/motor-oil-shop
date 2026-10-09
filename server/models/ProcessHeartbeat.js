const mongoose = require("mongoose");

// آخرین وضعیت هر نسخه‌ی پروسه‌ی سرور. لاگ Runflare بعد از ری‌استارت پاک می‌شه، پس
// نسخه‌ی بعدی از اینجا می‌فهمه نسخه‌ی قبلی کِی و با چه مصرف حافظه‌ای از بین رفته.
const ProcessHeartbeatSchema = new mongoose.Schema(
  {
    _id: { type: String },

    startedAt: { type: Date, required: true },

    lastSeenAt: { type: Date, required: true },

    rssMb: { type: Number, default: 0 },

    heapMb: { type: Number, default: 0 },

    // آخرین رویداد مهم (مثلاً سیگنال توقف یا خطای مهارنشده)
    note: { type: String, default: "" },

    // نام ماشین/کانتینر؛ اجرای محلی روی همین دیتابیس رو از نسخه‌های هاست جدا می‌کنه
    host: { type: String, default: "" },

    // بعد از ۷ روز خودکار پاک می‌شه
    createdAt: { type: Date, default: Date.now, expires: 7 * 24 * 60 * 60 },
  },
  { versionKey: false },
);

module.exports = mongoose.model("ProcessHeartbeat", ProcessHeartbeatSchema);
