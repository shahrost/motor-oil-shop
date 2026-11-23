import { toLatinDigits } from "../../../../utils/digits";
import { canonicalBrand, exactSkuProducts, identityText, supplierHasBrand } from "./priceIdentity.js";

export const latinDigits = toLatinDigits;

export function normalizeText(value) {
  return latinDigits(value).toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک")
    .replace(/[\u200c\u200e\u200f]/g, " ").replace(/\s+/g, " ").trim();
}

export function parseAmount(value) {
  let text = latinDigits(value).trim().replace(/[\u200e\u200f\u202a-\u202e]/g, "");
  if (/^\d{1,3}(?:\/\d{3})+$/.test(text)) text = text.replaceAll("/", ",");
  if (!text || !/^(?:\d+|\d{1,3}(?:[,٬،]\d{3})+)(?:[.٫]\d+)?$/.test(text)) return null;
  const number = Number(text.replace(/[,٬،]/g, "").replace("٫", "."));
  return Number.isFinite(number) && number >= 0 ? number : null;
}

export function priceInToman(value, unit, basis, cartonCount) {
  const amount = parseAmount(value);
  if (amount === null || !["rial", "toman"].includes(unit) || !["item", "carton"].includes(basis)) return null;
  const count = basis === "carton" ? Number(cartonCount) : 1;
  if (!Number.isSafeInteger(count) || count <= 0) return null;
  const price = amount / (unit === "rial" ? 10 : 1) / count;
  // Fractional toman amounts are rounded explicitly in the review screen.
  return Number.isFinite(price) && price <= 1_000_000_000_000 ? Math.round(price) : null;
}

export function extractAmounts(line) {
  const text = latinDigits(line);
  const values = [];
  const pattern = /\d+(?:[,٬،]\d{3})*(?:[.٫]\d+)?/g;
  for (const match of text.matchAll(pattern)) {
    const before = text[match.index - 1] || "";
    const after = text[match.index + match[0].length] || "";
    // Exclude SKUs, viscosity grades, dates and percentages.
    if (/[a-z\d\-/%]/i.test(before) || /[a-z\d\-/%]/i.test(after)) continue;
    const amount = parseAmount(match[0]);
    if (amount !== null && (amount === 0 || amount >= 1000) && amount <= 10_000_000_000_000) {
      if (!values.includes(match[0])) values.push(match[0]);
    }
  }
  return values;
}

export function productLabel(product) {
  return [product.brand, product.name, product.viscosity, product.api, product.volume, product.sku]
    .filter(Boolean).join(" · ");
}

function productScore(line, product) {
  const text = normalizeText(line);
  const sku = normalizeText(product.sku);
  if (sku && text.split(/[^\p{L}\p{N}-]+/u).includes(sku)) return 100;
  const compact = text.replace(/\s+/g, "");
  const viscosity = normalizeText(product.viscosity).replace(/\s+/g, "");
  const grades = compact.match(/\d{1,2}w-?\d{2}/g) || [];
  if (viscosity && grades.length && !grades.some((g) => g.replace("-", "") === viscosity.replace("-", ""))) return 0;
  const tokens = [...new Set(normalizeText([
    product.name, product.api, product.viscosity, product.volume,
  ].join(" ")).split(/[^\p{L}\p{N}]+/u).filter((t) => t.length > 1))];
  const words = new Set(text.split(/[^\p{L}\p{N}]+/u));
  return tokens.reduce((score, token) => score + (words.has(token) ? 1 : 0), 0)
    + (viscosity && compact.includes(viscosity) ? 3 : 0);
}

export function suggestProduct(line, products) {
  const ranked = products.map((p) => ({ product: p, score: productScore(line, p) }))
    .filter((p) => p.score >= 3).sort((a, b) => b.score - a.score);
  if (!ranked.length || (ranked[1] && ranked[0].score === ranked[1].score)) return null;
  return ranked[0].product;
}

function makePriceRow(product = null, extra = {}) {
  return {
    key: crypto.randomUUID(), productId: product?.id || "", amount: "", selected: false,
    baseline: { price: Number(product?.price || 0), priceCheck: Number(product?.priceCheck || 0) },
    source: "", page: null, amounts: [], query: "", ...extra,
  };
}

export function volumeInMl(value, defaultLiters = false) {
  const text = normalizeText(value).replace(/\s/g, "").replace(/(\d)\/(\d)(?!\d)/g, "$1.$2");
  const number = Number(text.match(/\d+(?:[.٫]\d+)?/)?.[0]?.replace("٫", "."));
  if (!Number.isFinite(number) || number <= 0) return null;
  if (/ml|cc|میلی|سیسی/.test(text)) return Math.round(number);
  if (defaultLiters || /l|لیتر/.test(text)) return Math.round(number * 1000);
  return null;
}

function packageKey(value, defaultLiters = false) {
  const text = normalizeText(value).replace(/\s/g, "").replace(/(\d)\/(\d)(?!\d)/g, "$1.$2");
  const amount = Number(text.match(/\d+(?:[.٫]\d+)?/)?.[0]?.replace("٫", "."));
  if (/kg|کیلو/.test(text)) return amount > 0 ? `mass:${Math.round(amount * 1000)}` : "";
  if (/g$|گرم/.test(text)) return amount > 0 ? `mass:${Math.round(amount)}` : "";
  const volume = volumeInMl(value, defaultLiters);
  return volume ? `volume:${volume}` : "";
}

function productKind(value) {
  const text = normalizeText(value).replace(/[\s\u200c]/g, "");
  if (/اکتان|octane/.test(text)) return "octane";
  if (/ترمز|brakefluid/.test(text)) return "brake";
  if (/flushing|تمیزکنندهموتور/.test(text)) return "flush";
  if (/انژکتور|fuelsystemcleaner/.test(text)) return "injector";
  if (text.includes("ضدیخ") || text.includes("coldmaster")) return "antifreeze";
  if (/هیدرولیک|ahf/.test(text)) return "hydraulic";
  if (text.includes("دوزمانه")) return "two-stroke";
  if (/سیکلت|jaso/.test(text)) return "motorcycle";
  if (/اتومات|atf|cvt|dct|xn\d/.test(text)) return "automatic";
  if (/دنده|gl[45]|mtf/.test(text)) return "gear";
  if (text.includes("موتور")) return "engine";
  return "";
}

function fluidCode(value) {
  const text = normalizeText(value), compact = text.replace(/[^a-z\d]/g, "");
  const xn = compact.match(/xn([3-9])/);
  if (xn) return `xn${xn[1]}`;
  for (const code of ["mvlvws", "al4", "cvt", "dct"]) if (compact.includes(code)) return code;
  if (/\bdx[ -]*(?:6|vi)\b|\batf\s*vi\b/.test(text)) return "vi";
  if (/\bdx[ -]*3\b|\batf\s*iii\b/.test(text)) return "iii";
  if (/\batf\s*iv\b/.test(text)) return "iv";
  return "";
}

// Supplier tables provide stronger identifiers than fuzzy text. Require compatible
// brand, product type, volume and technical specs; ties stay unassigned for review.
export function suggestTableProduct(row, products) {
  const source = [row.code, row.name, row.specs].filter(Boolean).join(" ");
  const explicit = row.code ? products.filter((product) => product.sku && identityText(product.sku) === identityText(row.code)) : [];
  const exact = explicit.length ? explicit : exactSkuProducts(source, products);
  const brand = canonicalBrand(row.supplier);
  const viscosityKey = (value) => normalizeText(value).replace(/sae/g, "").replace(/[\s-]/g, "");
  if (exact.length) {
    if (exact.length !== 1) return null;
    const product = exact[0];
    if (brand && !supplierHasBrand(brand, product.brand)) return null;
    if (row.volume && packageKey(row.volume, true) !== packageKey(product.volume)) return null;
    if (row.viscosity && viscosityKey(row.viscosity) !== viscosityKey(product.viscosity)) return null;
    return product;
  }
  if (row.code) {
    const codes = normalizeText(row.code).match(/[a-z]+[\s-]*\d+[a-z\d/-]*/g) || [];
    if (codes.length === 1) {
      const code = identityText(codes[0]);
      const coded = products.filter((product) => (!brand || supplierHasBrand(brand, product.brand))
        && (normalizeText(product.name).match(/[a-z]+[\s-]*\d+[a-z\d/-]*/g) || []).some((part) => identityText(part) === code));
      if (coded.length) return coded.length === 1 ? coded[0] : null;
    }
    return null;
  }
  if (!brand) return null;
  const size = packageKey(row.volume, true);
  const sourceText = `${row.name} ${row.specs}`;
  let kind = productKind(sourceText);
  const compactSpecs = normalizeText(sourceText).replace(/[\s\u200c-]/g, "");
  const api = normalizeText(row.api || compactSpecs.match(/gl[45]/)?.[0] || "").replace(/[\s-]/g, "");
  const viscosity = viscosityKey(row.viscosity || (/gl[45]/.test(compactSpecs)
    ? normalizeText(sourceText).match(/(\d{2})\s*-\s*(\d{2})/)?.slice(1).join("w") : ""));
  if (!kind && viscosity && /^[sc]/.test(api)) kind = "engine";
  if (!kind) {
    const named = products.filter((product) => supplierHasBrand(brand, product.brand)
      && identityText(product.name) === identityText(row.name)
      && (row.volume ? packageKey(product.volume) === size : !product.volume));
    return named.length === 1 ? named[0] : null;
  }
  if (!size && kind !== "flush") return null;
  if (["engine", "motorcycle"].includes(kind) && (!viscosity || !api)) return null;
  if (kind === "gear" && (!viscosity || (!api && !/\b(?:mtf|fluid|gh)\b/i.test(sourceText)))) return null;
  const fluid = kind === "automatic" ? fluidCode(sourceText) : "";
  if (kind === "automatic" && !fluid) return null;
  const candidates = products.filter((product) => {
    if (!supplierHasBrand(brand, product.brand) || (size && packageKey(product.volume) !== size)) return false;
    const description = `${product.name} ${product.category || ""} ${product.viscosity || ""} ${product.description || ""}`;
    const primary = `${product.name} ${product.sku || ""}`;
    if ((productKind(primary) || productKind(description)) !== kind) return false;
    const productViscosity = product.viscosity || normalizeText(product.description).replace(/[\s-]/g, "").match(/\d{1,2}w\d{2}/)?.[0];
    if (viscosity && viscosityKey(productViscosity) !== viscosity) return false;
    if (api) {
      const grades = normalizeText(product.api || product.description).replace(/-/g, "").match(/s[pqnmljcfed]|c[kij]4|c[dfce]|gl[45]/g) || [];
      // Some manual gearbox entries put GL4/GL5 in the description.
      if (!grades.includes(api) && !(kind === "gear" && normalizeText(description).replace(/[\s-]/g, "").includes(api))) return false;
    }
    if (fluid && (fluidCode(primary) || fluidCode(description)) !== fluid) return false;
    for (const [label, pattern] of [["yellow", /زرد|yellow/i], ["red", /قرمز|\bred\b/i]]) {
      if (pattern.test(sourceText) && !(pattern.test(primary) || pattern.test(product.description || "")
        || (label === "red" && /cvt/i.test(primary) && !/yellow/i.test(primary)))) return false;
    }
    for (const marker of ["c3", "chb", "extra"]) {
      if (new RegExp(`\\b${marker}\\b`, "i").test(sourceText)
        && !identityText(description + product.sku).includes(marker)) return false;
    }
    if (kind === "hydraulic") {
      const grade = compactSpecs.match(/vg(\d+)/)?.[1];
      if (!grade && !/ahf\s*22\s*s/i.test(sourceText)) return false;
      if (grade && !identityText(description).includes(`vg${grade}`)) return false;
    }
    const packaging = normalizeText(sourceText);
    if (/فلز/.test(packaging) && !/فلز|metal|tin/i.test(`${product.volume} ${description}`)) return false;
    if (/پلاست|پالست/.test(packaging) && /فلز|metal|tin\b/i.test(`${product.volume} ${description}`)) return false;
    for (const marker of ["quantic", "renovation", "9000", "7000", "5000", "titan", "octanium", "waterless", "flushing", "chb", "extra"]) {
      if (new RegExp(`\\b${marker}\\b`, "i").test(sourceText)
        && !identityText(description).includes(marker)) return false;
    }
    return true;
  });
  return candidates.length === 1 ? candidates[0] : null;
}

export function rowsFromPages(pages, products) {
  const rows = [];
  for (const page of pages) {
    if (page.table?.rows) {
      for (const entry of page.table.rows) {
        rows.push(makePriceRow(suggestTableProduct(entry, products), {
          source: entry.source, page: page.page, amounts: [entry.amount], amount: entry.amount,
        }));
      }
      continue;
    }
    for (const source of page.text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)) {
      const amounts = extractAmounts(source);
      if (!amounts.length) continue;
      rows.push(makePriceRow(suggestProduct(source, products), {
        source, page: page.page, amounts, amount: amounts.length === 1 ? amounts[0] : "",
      }));
    }
  }
  return rows.slice(0, 300);
}

// PDF text often contains one item per table cell. Group by visual row, not PDF stream order.
export function needsPdfOcr(text) {
  const pricedLines = text.split("\n").filter((line) => extractAmounts(line).length);
  return !pricedLines.length || text.includes("�")
    || !/\p{L}/u.test(text);
}

export function pdfTextLines(items, { maxTolerance = 5 } = {}) {
  const lines = [];
  for (const item of items.filter((i) => i.str?.trim()).sort((a, b) => b.transform[5] - a.transform[5])) {
    const y = item.transform[5];
    const tolerance = Math.max(2, Math.min(maxTolerance, (item.height || 10) * 0.35));
    let line = lines.find((l) => Math.abs(l.y - y) <= tolerance);
    if (!line) { line = { y, items: [] }; lines.push(line); }
    line.items.push(item);
  }
  return lines.map((line) => line.items.sort((a, b) => a.transform[4] - b.transform[4])
    .map((i) => i.str).join("   ")).join("\n");
}
