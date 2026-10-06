const path = require("path");
const fs = require("fs");
const AppError = require("./AppError");

// ایمپورت ممکنه از زمان مجاز پروکسی بیشتر طول بکشه، پس به‌صورت job پس‌زمینه
// اجرا می‌شه: درخواست فوراً jobId برمی‌گردونه و کلاینت وضعیت رو پیگیری می‌کنه.
const jobs = new Map();

function pruneJobs() {
  const limit = Date.now() - 60 * 60 * 1000;

  jobs.forEach((job, id) => {
    if (job.startedAt < limit) jobs.delete(id);
  });
}

function startJob(label, runner, imageCount) {
  pruneJobs();

  const jobId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const job = {
    status: "running",
    stage: "شروع",
    startedAt: Date.now(),
    results: null,
    error: "",
  };

  jobs.set(jobId, job);

  console.log(`[${label} ${jobId}] started (${imageCount} images)`);

  runner((stage) => {
    job.stage = stage;
    console.log(`[${label} ${jobId}] ${stage} (+${Date.now() - job.startedAt}ms)`);
  })
    .then((results) => {
      job.status = "done";
      job.results = results;
      console.log(`[${label} ${jobId}] done in ${Date.now() - job.startedAt}ms`);
    })
    .catch((error) => {
      job.status = "error";
      job.error = error.message || "خطا در ایمپورت";
      console.log(`[${label} ${jobId}] ERROR: ${job.error}`);
    });

  return jobId;
}

function getJob(jobId) {
  const job = jobs.get(jobId);

  if (!job) {
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
