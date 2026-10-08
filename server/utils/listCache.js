// کش حافظه‌ای یک لیست کامل (مثلاً همه‌ی محصولات یا همه‌ی خودروها).
// دیتابیس خارج از سرور است و هر کوئری چند ثانیه طول می‌کشد؛ با این کش جواب تقریباً فوری است.
// - هر تغییر در همین پروسه (پلاگین onAnyWrite روی مدل) کش را فوراً باطل می‌کند.
// - بعد از TTL، نسخه‌ی قبلی فوراً برگردانده می‌شود و نسخه‌ی تازه پس‌زمینه گرفته می‌شود
//   (برای تغییراتی که از بیرون این پروسه، مثلاً اسکریپت‌ها، انجام شده‌اند).

function createListCache({ name, ttlMs = 60 * 1000 }) {
  let entry = null; // { data, at }
  let pending = null; // Promise در حال دریافت
  let version = 0; // با هر invalidate زیاد می‌شود تا نتیجه‌ی کوئری قدیمی ذخیره نشود

  function invalidate() {
    entry = null;
    version += 1;
  }

  function refresh(loader) {
    // کوئری‌ای که قبل از آخرین تغییر شروع شده، دیتای قدیمی دارد؛ دوباره‌استفاده نمی‌شود
    if (pending && pending.version === version) return pending;

    const startedAt = version;

    const request = loader()
      .then((data) => {
        if (startedAt === version) entry = { data, at: Date.now() };

        return data;
      })
      .finally(() => {
        if (pending === request) pending = null;
      });

    request.version = startedAt;
    pending = request;

    return request;
  }

  async function get(loader) {
    if (!entry) return refresh(loader);

    if (Date.now() - entry.at > ttlMs) {
      refresh(loader).catch((error) =>
        console.error(`${name} cache refresh failed:`, error.message),
      );
    }

    return entry.data;
  }

  return { get, invalidate };
}

module.exports = createListCache;
