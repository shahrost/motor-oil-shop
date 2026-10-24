// کش حافظه‌ای جواب GET /api/vehicles/search-list (بافر gzip‌شده، ~۵۰KB). با هر تغییر
// خودروها (پلاگین onAnyWrite روی مدل Vehicle و ایمپورت) باطل می‌شه؛ تغییرات بیرون از
// پروسه (اسکریپت‌ها) حداکثر بعد از TTL دیده می‌شن.
const createListCache = require("./listCache");

module.exports = createListCache({ name: "VehicleSearch", ttlMs: 10 * 60 * 1000 });
