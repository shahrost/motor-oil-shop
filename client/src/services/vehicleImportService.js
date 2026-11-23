import apiClient from "../api/apiClient";
import parseVehicleExcel from "../utils/vehicleExcel";
import { withRetry, runImportJob, uploadImagesInBatches } from "./importJobClient";

// ابزار گروهی پنل ادمین: آپلود عکس‌ها و ایمپورت اکسل خودروها

// آپلود دسته‌ای عکس‌ها (جزئیات در importJobClient)
export function uploadVehicleImagesService(imageFiles, onProgress) {
  return uploadImagesInBatches("/vehicles/images", imageFiles, onProgress);
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
