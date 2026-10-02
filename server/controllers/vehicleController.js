const vehicleService = require("../services/vehicleImportService");
const path = require("path");
const fs = require("fs");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

async function getVehicles(req, res, next) {
  try {
    const vehicles = await vehicleService.getVehicles();

    return apiResponse.success(res, vehicles);
  } catch (error) {
    next(error);
  }
}

// آپلود دسته‌ای عکس‌ها (قبل از ایمپورت) تا درخواست‌ها حجیم نشن
async function uploadVehicleImages(req, res, next) {
  try {
    const files = (req.files && req.files.images) || [];

    if (!files.length) {
      throw new AppError("عکسی ارسال نشده است", 400);
    }

    return apiResponse.success(
      res,
      files.map((f) => ({ name: f.originalname, filename: f.filename })),
      "عکس‌ها آپلود شد",
    );
  } catch (error) {
    next(error);
  }
}

// عکس‌هایی که قبلاً با uploadVehicleImages آپلود شدن: { "C10001.webp": "<filename>" }
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
      const safeName = path.basename(String(filename));
      const fullPath = path.join("uploads", "products", safeName);

      return { originalname, filename: safeName, path: fullPath };
    })
    .filter((f) => fs.existsSync(f.path));
}

// ایمپورت ممکنه از زمان مجاز پروکسی بیشتر طول بکشه، پس به‌صورت job پس‌زمینه
// اجرا می‌شه: درخواست فوراً jobId برمی‌گردونه و کلاینت وضعیت رو پیگیری می‌کنه.
const jobs = new Map();

function pruneJobs() {
  const limit = Date.now() - 60 * 60 * 1000;

  jobs.forEach((job, id) => {
    if (job.startedAt < limit) jobs.delete(id);
  });
}

async function importVehicles(req, res, next) {
  try {
    const excelFile = req.files && req.files.file && req.files.file[0];

    if (!excelFile) {
      throw new AppError("فایل اکسل ارسال نشده است", 400);
    }

    const imageFiles = [
      ...((req.files && req.files.images) || []),
      ...resolveUploadedImages(req.body?.uploadedImages),
    ];

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

    console.log(`[vehicle-import ${jobId}] started (${imageFiles.length} images)`);

    vehicleService
      .importVehicles(excelFile, imageFiles, {
        removeMissing: req.body?.removeMissing === "true",
        onStage: (stage) => {
          job.stage = stage;
          console.log(
            `[vehicle-import ${jobId}] ${stage} (+${Date.now() - job.startedAt}ms)`,
          );
        },
      })
      .then((results) => {
        job.status = "done";
        job.results = results;
        console.log(
          `[vehicle-import ${jobId}] done in ${Date.now() - job.startedAt}ms`,
        );
      })
      .catch((error) => {
        job.status = "error";
        job.error = error.message || "خطا در ایمپورت خودروها";
        console.log(`[vehicle-import ${jobId}] ERROR: ${job.error}`);
      });

    return apiResponse.success(res, { jobId }, "ایمپورت شروع شد");
  } catch (error) {
    next(error);
  }
}

async function getImportStatus(req, res, next) {
  try {
    const job = jobs.get(req.params.jobId);

    if (!job) {
      throw new AppError("ایمپورت پیدا نشد (ممکنه سرور ریستارت شده باشه)", 404);
    }

    return apiResponse.success(res, {
      status: job.status,
      stage: job.stage,
      results: job.results,
      error: job.error,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getVehicles,
  importVehicles,
  getImportStatus,
  uploadVehicleImages,
};
