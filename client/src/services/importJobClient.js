import apiClient from "../api/apiClient";

// بخش مشترک ایمپورت‌های گروهی (محصولات و خودروها): ارسال با تکرار و پیگیری job پس‌زمینه.
// سرور Runflare گاهی بی‌صدا ری‌استارت می‌شه (حدود ۲۰ تا ۶۰ ثانیه قطعی)؛ بدون تکرار،
// وسط ایمپورت فقط «Network Error» می‌دید و job حافظه‌ای سرور هم از بین می‌رفت.

const RETRY_DELAYS_MS = [3000, 6000, 10000, 15000, 20000, 30000];
const POLL_INTERVAL_MS = 2000;
const POLL_MAX_MS = 15 * 60 * 1000;
const POLL_MAX_OUTAGE_MS = 3 * 60 * 1000;
const MAX_JOB_RESTARTS = 2;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// خطای ارتباطی (درخواست جواب نگرفته) یا خطای موقت پروکسی در زمان ری‌استارت هاست
function isTransient(error) {
  const status = error.response?.status;

  return !error.response || [502, 503, 504].includes(status);
}

// تکرار یک درخواست با فاصله‌ی زیاد تا سرور بالا بیاد؛ مرحله‌ی شکست‌خورده توی پیام خطا می‌آد
export async function withRetry(send, stepLabel, onRetry) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await send();
    } catch (error) {
      if (!isTransient(error) || attempt >= RETRY_DELAYS_MS.length) {
        error.message = `${stepLabel}: ${error.message}`;
        throw error;
      }

      if (onRetry) onRetry(attempt + 1);

      await wait(RETRY_DELAYS_MS[attempt]);
    }
  }
}

// منتظر پایان job می‌مونه. قطعی کوتاه سرور تحمل می‌شه؛ اگه job گم شده باشه (ری‌استارت) خطای jobLost می‌ده
async function waitForJob(statusPath, onStage) {
  const startedAt = Date.now();
  let outageStartedAt = null;

  while (Date.now() - startedAt < POLL_MAX_MS) {
    await wait(POLL_INTERVAL_MS);

    let job;

    try {
      const response = await apiClient.get(statusPath);

      job = response.data.data;
      outageStartedAt = null;
    } catch (error) {
      if (error.response?.status === 404) {
        const lost = new Error("ایمپورت روی سرور از بین رفت (سرور ری‌استارت شده)");

        lost.jobLost = true;
        throw lost;
      }

      if (!isTransient(error)) throw error;

      outageStartedAt = outageStartedAt || Date.now();

      if (Date.now() - outageStartedAt > POLL_MAX_OUTAGE_MS) {
        error.message = `پیگیری ایمپورت: ${error.message}`;
        throw error;
      }

      if (onStage) onStage("منتظر برگشت سرور");

      continue;
    }

    if (onStage) onStage(job.stage);

    if (job.status === "done") return job.results;

    if (job.status === "error") {
      const error = new Error(job.error);
      error.response = { data: { message: job.error } };
      throw error;
    }
  }

  throw new Error("ایمپورت بیش از حد طول کشید");
}

// شروع ایمپورت و منتظر نتیجه ماندن. اگه سرور وسط کار ری‌استارت بشه ایمپورت دوباره
// شروع می‌شه (ایمپورت بر اساس کد محصول/خودرو است و عکس‌ها قبلاً آپلود شدن).
// start() باید { jobId } برگردونه؛ statusPath(jobId) آدرس وضعیت job است.
export async function runImportJob({ start, statusPath, onStage }) {
  for (let restarts = 0; ; restarts += 1) {
    const { jobId } = await start();

    try {
      return await waitForJob(statusPath(jobId), onStage);
    } catch (error) {
      if (!error.jobLost || restarts >= MAX_JOB_RESTARTS) throw error;

      if (onStage) onStage("سرور ری‌استارت شد؛ شروع دوباره‌ی ایمپورت");
    }
  }
}
