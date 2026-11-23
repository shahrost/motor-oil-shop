const apiResponse = require("../utils/apiResponse");
const importJobService = require("../services/importJobService");

// هندلرهای مشترک ایمپورت گروهی (محصولات و خودروها)

// آپلود دسته‌ای عکس‌ها (قبل از ایمپورت) تا درخواست‌ها حجیم نشن.
// هر دسته همین‌جا به فضای ابری منتقل می‌شه تا job ایمپورت کوتاه بمونه و با
// ری‌استارت سرور (که job حافظه‌ای و دیسک موقت رو پاک می‌کنه) از دست نره.
async function uploadImagesBatch(req, res, next) {
  try {
    const files = (req.files && req.files.images) || [];

    return apiResponse.success(
      res,
      await importJobService.uploadImagesBatch(files),
      "عکس‌ها آپلود شد",
    );
  } catch (error) {
    next(error);
  }
}

// وضعیت job ایمپورتی که پس‌زمینه در حال اجراست
async function getImportStatus(req, res, next) {
  try {
    return apiResponse.success(res, await importJobService.getJob(req.params.jobId));
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadImagesBatch, getImportStatus };
