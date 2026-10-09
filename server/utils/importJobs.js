const path = require("path");
const fs = require("fs");
const AppError = require("./AppError");
const importJobRepository = require("../repositories/importJobRepository");

// ایمپورت ممکنه از زمان مجاز پروکسی بیشتر طول بکشه، پس به‌صورت job پس‌زمینه
// اجرا می‌شه: درخواست فوراً jobId برمی‌گردونه و کلاینت وضعیت رو پیگیری می‌کنه.
// وضعیت job در دیتابیس است تا هر نسخه‌ی سرور بتونه جواب پیگیری رو بده.
const HEARTBEAT_MS = 10 * 1000;
const HEARTBEAT_STALE_MS = 60 * 1000;

async function startJob(label, runner, imageCount) {
  const jobId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const startedAt = Date.now();

  await importJobRepository.createJob(jobId, label);

  console.log(`[${label} ${jobId}] started (${imageCount} images)`);

  // نوشتن‌ها پشت‌سرهم تا وضعیت نهایی با یک «مرحله»ی دیرتر رسیده بازنویسی نشه
  let writes = Promise.resolve();

  const save = (fields) => {
    writes = writes
      .then(() => importJobRepository.updateJob(jobId, fields))
      .catch((error) => console.error(`[${label} ${jobId}] status save failed:`, error.message));

    return writes;
  };

  const heartbeat = setInterval(() => save({ heartbeatAt: new Date() }), HEARTBEAT_MS);

  runner((stage) => {
    save({ stage, heartbeatAt: new Date() });
    console.log(`[${label} ${jobId}] ${stage} (+${Date.now() - startedAt}ms)`);
  })
    .then((results) => {
      console.log(`[${label} ${jobId}] done in ${Date.now() - startedAt}ms`);

      return save({ status: "done", results });
    })
    .catch((error) => {
      const message = error.message || "خطا در ایمپورت";

      console.log(`[${label} ${jobId}] ERROR: ${message}`);

      return save({ status: "error", error: message });
    })
    .finally(() => clearInterval(heartbeat));

  return jobId;
}

async function getJob(jobId) {
  const job = await importJobRepository.findJob(jobId);

  // job در حال اجرایی که مدتی خبری ازش نیست یعنی سرورِ اجراکننده ری‌استارت شده
  const lost =
    job &&
    job.status === "running" &&
    Date.now() - new Date(job.heartbeatAt).getTime() > HEARTBEAT_STALE_MS;

  if (!job || lost) {
    throw new AppError("ایمپورت پیدا نشد (ممکنه سرور ریستارت شده باشه)", 404);
  }

  return {
    status: job.status,
    stage: job.stage,
    results: job.results,
    error: job.error,
  };
}

// عکس‌هایی که قبلاً با آپلود دسته‌ای ذخیره شدن: { "C10001.webp": "<url یا filename>" }
// مقدار آدرس (ابری یا /uploads/...) یعنی عکس قبلاً منتقل شده و فقط همون آدرس استفاده می‌شه.
const isStoredUrl = (value) => /^(https?:\/\/|\/uploads\/)/.test(value);

function resolveUploadedImages(rawMap) {
  if (!rawMap) return [];

  let map;

  try {
    map = JSON.parse(rawMap);
  } catch {
    throw new AppError("لیست عکس‌های آپلودشده نامعتبر است", 400);
  }

  return Object.entries(map)
    .map(([originalname, filename]) => {
      if (isStoredUrl(String(filename))) {
        return { originalname, filename, url: filename };
      }

      const safeName = path.basename(String(filename));
      const fullPath = path.join("uploads", "products", safeName);

      return { originalname, filename: safeName, path: fullPath };
    })
    .filter((f) => f.url || fs.existsSync(f.path));
}

module.exports = { startJob, getJob, resolveUploadedImages };
