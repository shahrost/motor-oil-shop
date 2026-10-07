import apiClient from "../api/apiClient";
import { withRetry, runImportJob } from "./importJobClient";

// ابزارهای گروهی پنل ادمین: آپلود عکس‌ها، ایمپورت اکسل محصولات و بروزرسانی گروهی قیمت

// آپلود عکس‌ها به‌صورت دسته‌ای (هر بار چند فایل) تا درخواست حجیم نشه و قطع نشه.
// خروجی: { "نام فایل اصلی": "نام فایل روی سرور" }

// هر دسته روی سرور به فضای ابری هم منتقل می‌شه، پس دسته‌ها کوچیک‌ن تا درخواست طول نکشه
const IMAGE_BATCH_SIZE = 8;

export async function uploadProductImagesService(imageFiles, onProgress) {
  const uploaded = {};

  for (let i = 0; i < imageFiles.length; i += IMAGE_BATCH_SIZE) {
    const formData = new FormData();

    imageFiles
      .slice(i, i + IMAGE_BATCH_SIZE)
      .forEach((file) => formData.append("images", file));

    const response = await withRetry(
      () =>
        apiClient.post("/products/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
      "آپلود عکس‌ها",
    );

    (response.data.data || []).forEach((item) => {
      uploaded[item.name] = item.url || item.filename;
    });

    if (onProgress) {
      onProgress(Math.min(i + IMAGE_BATCH_SIZE, imageFiles.length));
    }
  }

  return uploaded;
}

// ایمپورت گروهی محصولات (فایل اکسل + عکس‌های آپلودشده)
// سرور ایمپورت رو پس‌زمینه اجرا می‌کنه و فوراً jobId برمی‌گردونه؛ بعدش وضعیت
// هر چند ثانیه چک می‌شه تا درخواست طولانی توسط پروکسی قطع نشه.

export async function importProductsService(
  excelFile,
  uploadedImages = {},
  removeMissing = false,
  onStage,
  { onlyNew = false, dryRun = false, imageNames = [] } = {},
) {
  const formData = new FormData();

  formData.append("file", excelFile);

  formData.append("removeMissing", String(removeMissing));

  formData.append("onlyNew", String(onlyNew));

  formData.append("uploadedImages", JSON.stringify(uploadedImages));

  // پیش‌نمایش (بدون ثبت): عکسی آپلود نمی‌شه، فقط اسم فایل‌ها برای بررسی ردیف‌ها می‌ره
  formData.append("dryRun", String(dryRun));

  formData.append("imageNames", JSON.stringify(imageNames));

  if (onStage) onStage("ارسال فایل اکسل به سرور");

  const results = await runImportJob({
    start: async () => {
      const response = await withRetry(
        () =>
          apiClient.post("/products/import", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        dryRun ? "پیش‌نمایش ایمپورت" : "شروع ایمپورت",
      );

      return response.data.data;
    },
    statusPath: (jobId) => `/products/import/${jobId}`,
    onStage,
  });

  return { data: results };
}

// بروزرسانی گروهی قیمت‌ها (فایل اکسل با ستون کد محصول و قیمت)

export async function bulkUpdatePricesService(excelFile) {
  const formData = new FormData();

  formData.append("file", excelFile);

  const response = await apiClient.post(
    "/products/bulk-price-update",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
