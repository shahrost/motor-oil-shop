import apiClient from "../api/apiClient";
import parseVehicleExcel from "../utils/parseVehicleExcel";

// دریافت همه خودروها

export async function fetchVehicles() {
  const response = await apiClient.get("/vehicles");

  return response.data;
}

// آپلود عکس‌ها به‌صورت دسته‌ای (هر بار چند فایل) تا درخواست حجیم نشه و قطع نشه.
// خروجی: { "نام فایل اصلی": "نام فایل روی سرور" }

const IMAGE_BATCH_SIZE = 20;

export async function uploadVehicleImagesService(imageFiles, onProgress) {
  const uploaded = {};

  for (let i = 0; i < imageFiles.length; i += IMAGE_BATCH_SIZE) {
    const formData = new FormData();

    imageFiles
      .slice(i, i + IMAGE_BATCH_SIZE)
      .forEach((file) => formData.append("images", file));

    const response = await apiClient.post("/vehicles/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    (response.data.data || []).forEach((item) => {
      uploaded[item.name] = item.filename;
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

const POLL_INTERVAL_MS = 2000;
const POLL_MAX_MS = 15 * 60 * 1000;
const POLL_MAX_FAILURES = 5;

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

  const start = await apiClient.post("/vehicles/import-parsed", {
    vehicles,
    uploadedImages,
    removeMissing,
  });

  const { jobId } = start.data.data;

  const startedAt = Date.now();
  let failures = 0;

  while (Date.now() - startedAt < POLL_MAX_MS) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

    let job;

    try {
      const response = await apiClient.get(`/vehicles/import/${jobId}`);

      job = response.data.data;
      failures = 0;
    } catch (error) {
      if (error.response?.status === 404) throw error;

      failures += 1;

      if (failures >= POLL_MAX_FAILURES) throw error;

      continue;
    }

    if (onStage) onStage(job.stage);

    if (job.status === "done") return { data: job.results };

    if (job.status === "error") {
      const error = new Error(job.error);
      error.response = { data: { message: job.error } };
      throw error;
    }
  }

  throw new Error("ایمپورت بیش از حد طول کشید");
}
