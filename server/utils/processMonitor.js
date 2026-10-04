// لاگ تشخیصی پروسه: مصرف حافظه‌ی دوره‌ای، سیگنال‌های توقف و خطاهای مهارنشده.
// برای پیدا کردن علت ری‌استارت‌های پشت‌سرهم سرور روی هاست (کمبود حافظه یا health check).
const INTERVAL_MS = 30 * 1000;

const mb = (bytes) => Math.round(bytes / 1024 / 1024);

function logMemory(label) {
  const { rss, heapUsed, heapTotal } = process.memoryUsage();

  console.log(
    `[process] ${label} rss=${mb(rss)}MB heap=${mb(heapUsed)}/${mb(heapTotal)}MB uptime=${Math.round(process.uptime())}s`,
  );
}

function startProcessMonitor() {
  logMemory("start");

  setInterval(() => logMemory("memory"), INTERVAL_MS).unref();

  ["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => {
      logMemory(`received ${signal}`);
      process.exit(0);
    });
  });

  process.on("unhandledRejection", (reason) => {
    console.error("[process] unhandledRejection:", reason);
  });

  process.on("uncaughtException", (error) => {
    console.error("[process] uncaughtException:", error);
    process.exit(1);
  });
}

module.exports = startProcessMonitor;
