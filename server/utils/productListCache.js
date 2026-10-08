// کش حافظه‌ای لیست کامل محصولات برای GET /api/products (منطق در listCache.js)
const createListCache = require("./listCache");

module.exports = createListCache({ name: "Product" });
