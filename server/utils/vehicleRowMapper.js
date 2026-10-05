const vehicleBrandsEn = require("../data/vehicleBrandsEn");
const { toNumber } = require("./excelReader");

// تبدیل ردیف‌های اکسل ← سند خودرو و نقشه‌ی ارتباط خودرو/محصول

function parseViscosities(raw) {
  return String(raw || "")
    .split(/[,،/\n]+/)
    .map((v) => v.replace(/\s+/g, "").toUpperCase())
    .filter(Boolean);
}

function cleanDash(value) {
  const str = String(value || "").trim();

  return str === "—" || str === "-" ? "" : str;
}

function simpleRowToDoc(row) {
  if (!row.name) throw new Error("نام خودرو خالی است");
  if (!row.brand) throw new Error("برند خودرو خالی است");

  return {
    sku: row.sku,
    name: row.name,
    nameEn: row.nameEn || row.name,
    brand: row.brand,
    brandEn: row.brandEn || vehicleBrandsEn[row.brand] || row.brand,
    years: row.years || "",
    yearsEn: row.yearsEn || row.years || "",
    engine: row.engine || "",
    engineEn: row.engineEn || row.engine || "",
    oilCapacity: row.oilCapacity || "",
    viscosities: parseViscosities(row.viscosities),
    api: row.api || "",
    interval: row.interval || "",
  };
}

function listRowToDoc(row) {
  if (!row.brand) throw new Error("برند خودرو خالی است");

  const variant = cleanDash(row.variant);
  const name = [row.model, variant].filter(Boolean).join(" ") || row.fullName;

  if (!name) throw new Error("نام خودرو (مدل) خالی است");

  return {
    sku: row.sku,
    name,
    nameEn: name,
    brand: row.brand,
    brandEn: vehicleBrandsEn[row.brand] || row.brand,
    country: row.country || "",
    engine: cleanDash(row.engine),
    engineEn: cleanDash(row.engine),
    engineSize: cleanDash(row.engineSize),
    fuel: cleanDash(row.fuel),
    gearbox: cleanDash(row.gearbox),
    body: cleanDash(row.body),
    maker: cleanDash(row.maker),
    status: cleanDash(row.status),
    viscosities: parseViscosities(row.viscosity),
    altViscosities: parseViscosities(row.viscosityAlt),
  };
}

// ارتباط خودرو ↔ محصول: { "C10001": [{ sku, priority, kind }, ...] }
function buildLinksMap(linkRows) {
  const map = new Map();

  linkRows.forEach((row) => {
    const vehicleSku = String(row.vehicleSku || "").trim().toUpperCase();
    const productSku = String(row.productSku || "").trim();

    if (!vehicleSku || !productSku) return;

    if (!map.has(vehicleSku)) map.set(vehicleSku, []);

    map.get(vehicleSku).push({
      sku: productSku,
      priority: toNumber(row.priority) || 0,
      kind: String(row.kind || "اصلی").trim(),
    });
  });

  map.forEach((links) => links.sort((a, b) => a.priority - b.priority));

  return map;
}

module.exports = { simpleRowToDoc, listRowToDoc, buildLinksMap };
