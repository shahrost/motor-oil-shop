// کش حافظه‌ای جواب GET /api/vehicles/filter-compatibility (به شکل رشته‌ی JSON آماده،
// که کم‌حافظه‌ترین شکله). با هر تغییر خودروها (پلاگین onAnyWrite روی مدل Vehicle)
// باطل می‌شه؛ تغییرات بیرون از پروسه (اسکریپت‌ها) حداکثر بعد از TTL دیده می‌شن.
const createListCache = require("./listCache");

module.exports = createListCache({ name: "FilterCompatibility", ttlMs: 10 * 60 * 1000 });
