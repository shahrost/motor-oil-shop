const productImportService = require("../services/productImportService");
const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");

async function importProducts(req, res, next) {
  try {
    const excelFile = req.files && req.files.file && req.files.file[0];

    if (!excelFile) {
      throw new AppError("فایل اکسل ارسال نشده است", 400);
    }

    const imageFiles = (req.files && req.files.images) || [];

    const results = await productImportService.importProducts(excelFile, imageFiles);

    return apiResponse.success(res, results, "ایمپورت محصولات انجام شد");
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
  importProducts,
  bulkUpdatePrices,
};
