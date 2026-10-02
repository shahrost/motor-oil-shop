const vehicleService = require("../services/vehicleImportService");
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

async function importVehicles(req, res, next) {
  try {
    const excelFile = req.files && req.files.file && req.files.file[0];

    if (!excelFile) {
      throw new AppError("فایل اکسل ارسال نشده است", 400);
    }

    const imageFiles = (req.files && req.files.images) || [];

    const results = await vehicleService.importVehicles(excelFile, imageFiles, {
      removeMissing: req.body?.removeMissing === "true",
    });

    return apiResponse.success(res, results, "ایمپورت خودروها انجام شد");
  } catch (error) {
    next(error);
  }
}

module.exports = { getVehicles, importVehicles };
