import apiClient from "../api/apiClient";
import parseVehicleExcel from "../utils/parseVehicleExcel";
import { withRetry, runImportJob } from "./importJobClient";

// دریافت همه خودروها

export async function fetchVehicles() {
  const response = await apiClient.get("/vehicles");

  return response.data;
}

// آپلود عکس‌ها به‌صورت دسته‌ای (هر بار چند فایل) تا درخواست حجیم نشه و قطع نشه.
// خروجی: { "نام فایل اصلی": "نام فایل روی سرور" }

// هر دسته روی سرور به فضای ابری هم منتقل می‌شه، پس دسته‌ها کوچیک‌ن تا درخواست طول نکشه
const IMAGE_BATCH_SIZE = 8;

export async function uploadVehicleImagesService(imageFiles, onProgress) {
  const uploaded = {};

  for (let i = 0; i < imageFiles.length; i += IMAGE_BATCH_SIZE) {
    const formData = new FormData();

    imageFiles
      .slice(i, i + IMAGE_BATCH_SIZE)
      .forEach((file) => formData.append("images", file));

    const response = await withRetry(
      () =>
        apiClient.post("/vehicles/images", formData, {
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

// ایمپورت گروهی خودروها (فایل اکسل + عکس‌های آپلودشده)
// سرور ایمپورت رو پس‌زمینه اجرا می‌کنه و فوراً jobId برمی‌گردونه؛ بعدش وضعیت
// هر چند ثانیه چک می‌شه تا درخواست طولانی توسط پروکسی قطع نشه.

export async function importVehiclesService(
  excelFile,
  uploadedImages = {},
  removeMissing = false,
  onStage,
) {
  // اکسل توی مرورگر پردازش می‌شه و فقط JSON به سرور می‌ره (سرور CPU کمی داره)
  if (onStage) onStage("پردازش فایل اکسل در مرورگر");

  const vehicles = await parseVehicleExcel(excelFile);

  if (onStage) onStage("ارسال اطلاعات به سرور");

  const results = await runImportJob({
    start: async () => {
      const response = await withRetry(
        () =>
          apiClient.post("/vehicles/import-parsed", {
            vehicles,
            uploadedImages,
            removeMissing,
          }),
        "شروع ایمپورت",
      );

      return response.data.data;
    },
    statusPath: (jobId) => `/vehicles/import/${jobId}`,
    onStage,
  });

  return { data: results };
}
