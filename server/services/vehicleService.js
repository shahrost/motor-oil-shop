const vehicleRepository = require("../repositories/vehicleRepository");

const { FILTER_KIND } = require("../data/vehicleLinkKinds");

async function getVehicles() {
  return vehicleRepository.getAllVehicles();
}

// برندهای خودرو با تعداد مدل‌ها (برای صفحه‌ی «خودروها»؛ خیلی سبک‌تر از لیست کامل)
async function getVehicleBrands() {
  return vehicleRepository.getBrandSummaries();
}

// خودروهای سازگار هر فیلتر، از همان لینک‌های فیلتر خودروها (بدون داده‌ی جدید):
// { "<کد محصول>": [{ name, nameEn }] } — هر خودرو برای هر محصول یک بار
async function getFilterCompatibility() {
  const vehicles = await vehicleRepository.getVehiclesWithFilterLinks(FILTER_KIND);
  const bySku = {};

  vehicles.forEach((vehicle) => {
    const skus = new Set(
      (vehicle.productLinks || [])
        .filter((link) => link.kind === FILTER_KIND)
        .map((link) => String(link.sku).toUpperCase()),
    );

    skus.forEach((sku) => {
      if (!bySku[sku]) bySku[sku] = [];

      bySku[sku].push({ name: vehicle.name, nameEn: vehicle.nameEn || "" });
    });
  });

  return bySku;
}

module.exports = { getVehicles, getVehicleBrands, getFilterCompatibility };
