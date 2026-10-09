const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");
const { getJob } = require("../utils/importJobs");
const { persistImages } = require("../utils/cloudStorage");

// هندلرهای مشترک ایمپورت گروهی (محصولات و خودروها)

// آپلود دسته‌ای عکس‌ها (قبل از ایمپورت) تا درخواست‌ها حجیم نشن.
// هر دسته همین‌جا به فضای ابری منتقل می‌شه تا job ایمپورت کوتاه بمونه و با
// ری‌استارت سرور (که job حافظه‌ای و دیسک موقت رو پاک می‌کنه) از دست نره.
async function uploadImagesBatch(req, res, next) {
  try {
    const files = (req.files && req.files.images) || [];

    if (!files.length) {
      throw new AppError("عکسی ارسال نشده است", 400);
    }

    const urls = await persistImages(files);

    return apiResponse.success(
      res,
      files.map((f) => ({
        name: f.originalname,
        filename: f.filename,
        url: urls.get(f.filename),
      })),
      "عکس‌ها آپلود شد",
    );
  } catch (error) {
    next(error);
  }
}

// وضعیت job ایمپورتی که پس‌زمینه در حال اجراست
async function getImportStatus(req, res, next) {
  try {
    return apiResponse.success(res, await getJob(req.params.jobId));
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadImagesBatch, getImportStatus };
