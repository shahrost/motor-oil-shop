const apiResponse = require("../utils/apiResponse");
const AppError = require("../utils/AppError");
const { getJob } = require("../utils/importJobs");

// هندلرهای مشترک ایمپورت گروهی (محصولات و خودروها)

// آپلود دسته‌ای عکس‌ها (قبل از ایمپورت) تا درخواست‌ها حجیم نشن
async function uploadImagesBatch(req, res, next) {
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

// وضعیت job ایمپورتی که پس‌زمینه در حال اجراست
async function getImportStatus(req, res, next) {
  try {
    return apiResponse.success(res, getJob(req.params.jobId));
  } catch (error) {
    next(error);
  }
}

module.exports = { uploadImagesBatch, getImportStatus };
