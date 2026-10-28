// ارسال پیامک با کاوه‌نگار (https://kavenegar.com/rest.html — sms/send.json).
// تنظیمات از env: KAVENEGAR_API_KEY (الزامی)، KAVENEGAR_SENDER (شماره‌ی خط؛ خالی ← خط پیش‌فرض پنل).
// بدون کلید، ارسال بی‌صدا انجام نمی‌شه (محیط توسعه یا قبل از ساخت پنل).
const API_BASE = "https://api.kavenegar.com/v1";
const TIMEOUT_MS = 10000;

function isSmsConfigured() {
  return Boolean(process.env.KAVENEGAR_API_KEY);
}

// receptors: آرایه‌ی شماره‌ها (۰۹…). خطا throw می‌شه؛ صدا زننده تصمیم می‌گیره نادیده بگیره یا نه
async function sendSms(receptors, message) {
  const apiKey = process.env.KAVENEGAR_API_KEY;
  if (!apiKey || !receptors.length) return false;

  const body = new URLSearchParams({ receptor: receptors.join(","), message });
  if (process.env.KAVENEGAR_SENDER) body.set("sender", process.env.KAVENEGAR_SENDER);

  const response = await fetch(`${API_BASE}/${encodeURIComponent(apiKey)}/sms/send.json`, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  // کاوه‌نگار وضعیت رو در return.status هم برمی‌گردونه (۲۰۰ = موفق)؛ کلید API در پیام خطا نمیاد
  const result = await response.json().catch(() => null);
  const status = result?.return?.status ?? response.status;

  if (status !== 200) {
    throw new Error(`Kavenegar ${status}: ${result?.return?.message || response.statusText}`);
  }

  return true;
}

module.exports = { sendSms, isSmsConfigured };
