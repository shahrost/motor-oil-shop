// لیست برندهای خودرو برای صفحه‌ی «خودروهای من»: هر برند یک بار
// (بدون توجه به خودروساز/واردکننده)، به ترتیب تعداد مدل‌ها
export function getVehicleBrands(vehicles) {
  const brands = new Map();

  vehicles.forEach((vehicle) => {
    const entry = brands.get(vehicle.brand);

    if (entry) {
      entry.count += 1;
    } else {
      brands.set(vehicle.brand, {
        name: vehicle.brand,
        nameEn: vehicle.brandEn || vehicle.brand,
        count: 1,
      });
    }
  });

  return [...brands.values()].sort((a, b) => b.count - a.count);
}

// آدرس صفحه‌ی مدل‌های یک برند
export function vehicleBrandPath(brand) {
  return `/vehicles/${encodeURIComponent(brand)}`;
}

export default getVehicleBrands;
