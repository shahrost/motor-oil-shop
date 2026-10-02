// برندهای خودرو از روی لیست خودروها ساخته می‌شن (هر برند = مقدار منحصربه‌فرد فیلد brand).
export function getVehicleBrands(vehicles) {
  const map = new Map();

  vehicles.forEach((vehicle) => {
    const entry = map.get(vehicle.brand);

    if (entry) {
      entry.count += 1;
    } else {
      map.set(vehicle.brand, {
        name: vehicle.brand,
        nameEn: vehicle.brandEn || vehicle.brand,
        count: 1,
      });
    }
  });

  return [...map.values()];
}

export default getVehicleBrands;
