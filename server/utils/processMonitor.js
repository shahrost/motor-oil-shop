// لاگ تشخیصی پروسه: مصرف حافظه‌ی دوره‌ای، سیگنال‌های توقف و خطاهای مهارنشده.
// برای پیدا کردن علت ری‌استارت‌های پشت‌سرهم سرور روی هاست (کمبود حافظه یا health check).
// چون لاگ Runflare بعد از ری‌استارت پاک می‌شه، آخرین وضعیت هر نسخه در دیتابیس هم ذخیره
// می‌شه و نسخه‌ی بعدی موقع شروع، سرنوشت نسخه‌ی قبلی رو لاگ می‌کنه.
const mongoose = require("mongoose");
const processHeartbeatRepository = require("../repositories/processHeartbeatRepository");

const INTERVAL_MS = 30 * 1000;
const HEARTBEAT_MS = 10 * 1000;

const mb = (bytes) => Math.round(bytes / 1024 / 1024);

const instanceId = `${Date.now()}-${process.pid}`;
const startedAt = new Date();

function logMemory(label) {
  const { rss, heapUsed, heapTotal } = process.memoryUsage();

  console.log(
    `[process] ${label} rss=${mb(rss)}MB heap=${mb(heapUsed)}/${mb(heapTotal)}MB uptime=${Math.round(process.uptime())}s`,
  );
}

function saveHeartbeat(note) {
  if (mongoose.connection.readyState !== 1) return Promise.resolve();

  const { rss, heapUsed } = process.memoryUsage();
  const fields = { startedAt, lastSeenAt: new Date(), rssMb: mb(rss), heapMb: mb(heapUsed) };

  if (note) fields.note = note;

  return processHeartbeatRepository
    .saveHeartbeat(instanceId, fields)
    .catch((error) => console.error("[process] heartbeat save failed:", error.message));
}

// ذخیره‌ی آخرین وضعیت قبل از خروج، حداکثر ۳ ثانیه انتظار
const saveThenExit = (note, code) =>
  Promise.race([saveHeartbeat(note), new Promise((resolve) => setTimeout(resolve, 3000))])
    .finally(() => process.exit(code));

async function logPreviousInstance() {
  try {
    const previous = await processHeartbeatRepository.findPreviousHeartbeat(instanceId);

    if (!previous) return;

    const lastSeen = new Date(previous.lastSeenAt);
    const gapSec = Math.round((startedAt - lastSeen) / 1000);

    console.log(
      `[process] previous instance started ${new Date(previous.startedAt).toISOString()}, last seen ${lastSeen.toISOString()} (${gapSec}s before this start) rss=${previous.rssMb}MB heap=${previous.heapMb}MB note="${previous.note}"`,
    );
  } catch (error) {
    console.error("[process] previous instance lookup failed:", error.message);
  }
}

function startProcessMonitor() {
  logMemory("start");

  setInterval(() => logMemory("memory"), INTERVAL_MS).unref();

  mongoose.connection.once("open", () => {
    logPreviousInstance().then(() => saveHeartbeat("started"));

    setInterval(() => saveHeartbeat(), HEARTBEAT_MS).unref();
  });

  ["SIGTERM", "SIGINT"].forEach((signal) => {
    process.on(signal, () => {
      logMemory(`received ${signal}`);
      saveThenExit(`received ${signal}`, 0);
    });
  });

  process.on("unhandledRejection", (reason) => {
    console.error("[process] unhandledRejection:", reason);
  });

  process.on("uncaughtException", (error) => {
    console.error("[process] uncaughtException:", error);
    saveThenExit(`uncaughtException: ${error.message}`, 1);
  });
}

module.exports = startProcessMonitor;
