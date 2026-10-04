const vehicleService = require("../services/vehicleService");
const vehicleImportService = require("../services/vehicleImportService");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");
const { startJob, resolveUploadedImages } = require("../utils/importJobs");

async function getVehicles(req, res, next) {
  try {
    const vehicles = await vehicleService.getVehicles();

    return apiResponse.success(res, vehicles);
  } catch (error) {
    next(error);
  }
}

// ایمپورت از فایل اکسل (job پس‌زمینه؛ فوراً jobId برمی‌گردونه)
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

    const jobId = startJob(
      "vehicle-import",
      (onStage) =>
        vehicleImportService.importVehicles(excelFile, imageFiles, {
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

// ایمپورت از JSON آماده (اکسل توی مرورگر پردازش شده)
async function importParsedVehicles(req, res, next) {
  try {
    const imageFiles = resolveUploadedImages(
      JSON.stringify(req.body?.uploadedImages || {}),
    );

    const jobId = startJob(
      "vehicle-import",
      (onStage) =>
        vehicleImportService.importParsedVehicles(req.body?.vehicles, imageFiles, {
          removeMissing: req.body?.removeMissing === true,
          onStage,
        }),
      imageFiles.length,
    );

    return apiResponse.success(res, { jobId }, "ایمپورت شروع شد");
  } catch (error) {
    next(error);
  }
}

module.exports = { getVehicles, importVehicles, importParsedVehicles };
