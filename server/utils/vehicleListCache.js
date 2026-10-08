// کش حافظه‌ای لیست کامل خودروها برای GET /api/vehicles (منطق در listCache.js)
const createListCache = require("./listCache");

module.exports = createListCache({ name: "Vehicle" });
