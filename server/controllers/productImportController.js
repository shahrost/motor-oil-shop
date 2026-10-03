const productImportService = require("../services/productImportService");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");
const {
  startJob,
  getJob,
  resolveUploadedImages,
} = require("../utils/importJobs");

// آپلود دسته‌ای عکس‌ها (قبل از ایمپورت) تا درخواست‌ها حجیم نشن
async function uploadProductImages(req, res, next) {
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

async function getImportStatus(req, res, next) {
  try {
    return apiResponse.success(res, getJob(req.params.jobId));
  } catch (error) {
    next(error);
  }
}

async function bulkUpdatePrices(req, res, next) {
  try {
    if (!req.file) {
      throw new AppError("فایل ارسال نشده است", 400);
    }

    const results = await productImportService.bulkUpdatePrices(req.file);

    return apiResponse.success(res, results, "بروزرسانی قیمت‌ها انجام شد");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadProductImages,
  importProducts,
  getImportStatus,
  bulkUpdatePrices,
};
