const vehicleRepository = require("../repositories/vehicleRepository");
const filterCompatibilityCache = require("../utils/filterCompatibilityCache");
const vehicleSearchCache = require("../utils/vehicleSearchCache");
const { gzipSuccessBody } = require("../utils/gzipJson");

const { FILTER_KIND } = require("../data/vehicleLinkKinds");

// همه‌ی خودروها بدون لینک محصولات (لیست کامل با لینک‌ها خیلی حجیمه و کش نمی‌شه)
async function getVehicles() {
  return vehicleRepository.getLightList();
}

// مدل‌های یک برند (برای صفحه‌ی /vehicles/:brand)
async function getBrandVehicles(brand) {
  return vehicleRepository.findByBrand(brand);
}

// یک خودرو با شناسه (برای صفحه‌ی /vehicle/:id)؛ نبود ← null
async function getVehicleById(id) {
  return vehicleRepository.findById(id);
}

// برندهای خودرو با تعداد مدل‌ها (برای صفحه‌ی «خودروها»؛ خیلی سبک‌تر از لیست کامل)
async function getVehicleBrands() {
  return vehicleRepository.getBrandSummaries();
}

// لیست سبک همه‌ی خودروها برای جستجو (فارسی/انگلیسی) در صفحه‌ی «خودروهای من».
// خروجی بافر gzip‌شده‌ی جواب کامله (کش‌شده تا درخواست‌های هم‌زمان حافظه‌ی جدید نگیرن)
async function getVehicleSearchListBody() {
  return vehicleSearchCache.get(async () =>
    gzipSuccessBody(JSON.stringify(await vehicleRepository.getSearchList())),
  );
}

// خودروهای سازگار هر فیلتر، از همان لینک‌های فیلتر خودروها (بدون داده‌ی جدید):
// '{ "<کد محصول>": [{ name, nameEn }] }' — هر خودرو برای هر محصول یک بار.
// خروجی بافر gzip‌شده‌ی جواب کامله (کش‌شده؛ کم‌حافظه‌تر از رشته یا آبجکت‌ها)
async function getFilterCompatibilityBody() {
  return filterCompatibilityCache.get(async () => {
    const rows = await vehicleRepository.getCompatibilityByProduct(FILTER_KIND);

    return gzipSuccessBody(
      JSON.stringify(Object.fromEntries(rows.map((row) => [row._id, row.vehicles]))),
    );
  });
}

module.exports = {
  getVehicles,
  getBrandVehicles,
  getVehicleById,
  getVehicleBrands,
  getVehicleSearchListBody,
  getFilterCompatibilityBody,
};
