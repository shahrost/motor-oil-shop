// ردیف‌های «مشخصات خودرو» به شکل [برچسب، مقدار]؛ ردیف‌های خالی حذف می‌شن
function buildVehicleSpecs(vehicle, language, t) {
  const en = language === "en";
  const pick = (fa, enValue) => (en ? enValue || fa : fa);
  const withUnit = (value, unit) => value && `${value} ${unit}`;

  return [
    [t("common.brand"), pick(vehicle.brand, vehicle.brandEn)],
    [t("vehicles.years"), pick(vehicle.years, vehicle.yearsEn)],
    [t("vehicles.engine"), pick(vehicle.engine, vehicle.engineEn)],
    [t("vehicles.engineSize"), withUnit(vehicle.engineSize, t("vehicles.liter"))],
    [t("vehicles.fuel"), vehicle.fuel],
    [t("vehicles.gearbox"), vehicle.gearbox],
    [t("vehicles.body"), vehicle.body],
    [t("vehicles.status"), vehicle.status],
    [t("vehicles.oilCapacity"), withUnit(vehicle.oilCapacity, t("vehicles.liter"))],
    [t("vehicles.viscosity"), vehicle.viscosities.join(" / ")],
    [t("vehicles.altViscosity"), (vehicle.altViscosities || []).join(" / ")],
    [t("vehicles.api"), vehicle.api],
    [t("vehicles.changeInterval"), withUnit(vehicle.interval, t("vehicles.km"))],
  ].filter(([, value]) => value && String(value).trim());
}

export default buildVehicleSpecs;
