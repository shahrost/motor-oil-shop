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

    const results = await vehicleService.importVehicles(excelFile, imageFiles, {
      removeMissing: req.body?.removeMissing === "true",
    });

    return apiResponse.success(res, results, "ایمپورت خودروها انجام شد");
  } catch (error) {
    next(error);
  }
}

module.exports = { getVehicles, importVehicles, uploadVehicleImages };
