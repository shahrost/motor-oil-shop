const productImportService = require("../services/productImportService");
const priceUpdateService = require("../services/priceUpdateService");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");
const { startJob, resolveUploadedImages } = require("../utils/importJobs");

// ایمپورت به‌صورت job پس‌زمینه اجرا می‌شه و فوراً jobId برمی‌گردونه
async function importProducts(req, res, next) {
  try {
    const excelFile = req.files && req.files.file && req.files.file[0];

    if (!excelFile) {
      throw new AppError("فایل اکسل ارسال نشده است", 400);
    }

    const imageFiles = [
      ...((req.files && req.files.images) || []),
      ...resolveUploadedImages(req.body?.uploadedImages),
    ];

    const jobId = startJob(
      "product-import",
      (onStage) =>
        productImportService.importProducts(excelFile, imageFiles, {
          removeMissing: req.body?.removeMissing === "true",
          onStage,
        }),
      imageFiles.length,
    );

    return apiResponse.success(res, { jobId }, "ایمپورت شروع شد");
  } catch (error) {
    next(error);
  }
}

async function bulkUpdatePrices(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError("فایل ارسال نشده است", 400);
    }

    const results = await priceUpdateService.bulkUpdatePrices(req.file);

    return apiResponse.success(res, results, "بروزرسانی قیمت‌ها انجام شد");
  } catch (error) {
    next(error);
  }
}

module.exports = { importProducts, bulkUpdatePrices };
