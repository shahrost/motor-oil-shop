// Import only the detected supplier. Native module caching reuses its samples.
const suppliers = new Map([
  ["ادینول", () => import("../data/glyphs/addinol.js")],
  ["ایدلوب", () => import("../data/glyphs/aidlube.js")],
  ["بهتام", () => import("../data/glyphs/behtam.js")],
  ["فیلتر لوکومبیل", () => import("../data/glyphs/locomobil.js")],
  ["لوکینی", () => import("../data/glyphs/lookini.js")],
  ["فیلتر میهن", () => import("../data/glyphs/mihan.js")],
  ["سمن شیمی", () => import("../data/glyphs/seman.js")],
  ["وم اویل", () => import("../data/glyphs/wom-oil.js")],
  ["ووفر", () => import("../data/glyphs/woofer.js")],
]);

export async function loadSupplierGlyphs(supplier) {
  const load = suppliers.get(supplier);
  return load ? (await load()).default : {};
}
