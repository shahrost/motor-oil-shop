import vehicleBrandsEn from "../../data/vehicleBrandsEn";
import { toNumber } from "./excelReader";

// تبدیل ردیف اکسل به سند خودرو (مثل server/utils/vehicleRowMapper.js)

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

export function simpleRowToDoc(row) {
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

export function listRowToDoc(row) {
  const variant = cleanDash(row.variant);
  const name = [row.model, variant].filter(Boolean).join(" ") || row.fullName;

  return {
    sku: row.sku,
    name,
    nameEn: cleanDash(row.nameEn) || name,
    brand: row.brand,
    brandEn: vehicleBrandsEn[row.brand] || row.brand,
    country: row.country || "",
    years: cleanDash(row.years),
    yearsEn: cleanDash(row.yearsEn) || cleanDash(row.years),
    engine: cleanDash(row.engine),
    engineEn: cleanDash(row.engine),
    engineSize: cleanDash(row.engineSize),
    fuel: cleanDash(row.fuel),
    gearbox: cleanDash(row.gearbox),
    body: cleanDash(row.body),
    maker: cleanDash(row.maker),
    status: cleanDash(row.status),
    oilCapacity: cleanDash(row.oilCapacity),
    api: cleanDash(row.api),
    interval: cleanDash(row.interval),
    viscosities: parseViscosities(row.viscosity),
    altViscosities: parseViscosities(row.viscosityAlt),
  };
}

export function buildLinksMap(linkRows) {
  const map = new Map();

  linkRows.forEach((row) => {
    const vehicleSku = String(row.vehicleSku || "").trim().toUpperCase();
    const productSku = String(row.productSku || "").trim();

    if (!vehicleSku || !productSku) return;

    if (!map.has(vehicleSku)) map.set(vehicleSku, []);

    map.get(vehicleSku).push({
      sku: productSku,
      priority: toNumber(row.priority),
      kind: String(row.kind || "اصلی").trim(),
    });
  });

  map.forEach((links) => links.sort((a, b) => a.priority - b.priority));

  return map;
}
