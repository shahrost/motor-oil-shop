import { normalizeText, parseAmount } from "./priceListHelpers.js";
import { detectSupplier } from "./priceIdentity.js";
import { tableUnit, technicalFields } from "./coordinatePriceTable.js";

export function technicalVolume(text) {
  const value = normalizeText(text).replace(/٫/g, ".");
  const number = "(\\d+(?:\\.\\d+)?)", unit = "(میلی\\s*لیتر|لیتر[یي]?|litr|litre|liter|ml|cc|kg|کیلوگرم[یي]?|کیلو[یي]?[یي]?)";
  const forward = value.match(new RegExp("(?<![\\p{L}\\p{N}.])" + number + "\\s*" + unit, "iu"));
  const reverse = value.match(new RegExp(unit + "\\s*" + number + "(?![\\p{L}\\p{N}.])", "iu"));
  if (reverse) return reverse[2] + (/kg|کیلو/.test(reverse[1]) ? "kg" : /ml|cc|میلی/.test(reverse[1]) ? "ml" : "L");
  if (forward) return forward[1] + (/kg|کیلو/.test(forward[2]) ? "kg" : /ml|cc|میلی/.test(forward[2]) ? "ml" : "L");
  return "";
}

// Designed lists sometimes omit column headings but repeat an explicit viscosity,
// package size, price and unit. Shared API labels apply only inside their section.
export function readTechnicalPriceTable(items, { brands = [] } = {}) {
  const clean = items.filter((item) => item.str?.trim()), groups = [];
  for (const item of [...clean].sort((a, b) => b.transform[5] - a.transform[5])) {
    const y = item.transform[5] + item.height * 0.4;
    let group = groups.find((group) => Math.abs(group.y - y) < Math.max(3, item.height * 0.6));
    if (!group) { group = { y, items: [] }; groups.push(group); }
    group.items.push(item);
  }
  const full = clean.map((item) => item.str).join(" "), supplier = detectSupplier(full, brands);
  if (!supplier) return null;
  const apiAnchors = clean.filter((item) => /^(?:s[pqnmljcfed]|c[ikj]4|c[dfce])$/.test(normalizeText(item.str)))
    .map((item) => ({ api: normalizeText(item.str), y: item.transform[5] + item.height * 0.4 }));
  const moneyLabels = clean.filter((item) => /^(?:ریال|تومان)$/.test(normalizeText(item.str))).map((item) => item.transform[4]).sort((a, b) => a - b);
  const moneyRight = moneyLabels.length >= 3 ? moneyLabels[Math.floor(moneyLabels.length / 2)] : null;
  let kind = "", kindY = Infinity;
  const rows = [];
  for (const group of groups.sort((a, b) => b.y - a.y)) {
    const text = group.items.sort((a, b) => a.transform[4] - b.transform[4]).map((item) => item.str).join(" ");
    const normalized = normalizeText(text), fields = technicalFields(text);
    let amounts = group.items.filter((item) => parseAmount(item.str) >= 10000);
    const volume = technicalVolume(text);
    const rowMoneyRight = moneyRight || group.items.find((item) => /^(?:ریال|تومان)$/.test(normalizeText(item.str)))?.transform[4];
    if (rowMoneyRight) {
      const parts = group.items.filter((item) => item.transform[4] < rowMoneyRight
        && /^[\d,٬،.٫/]+$/.test(normalizeText(item.str).replace(/\s/g, ""))).sort((a, b) => a.transform[4] - b.transform[4]);
      if (parts.length) {
        const amount = parts.map((item) => normalizeText(item.str).replace(/\s/g, "")).join("");
        const tallest = parts.reduce((a, b) => a.height > b.height ? a : b);
        amounts = parseAmount(amount) >= 10000 ? [{ ...tallest, str: amount,
          width: Math.max(...parts.map((item) => item.transform[4] + item.width)) - parts[0].transform[4],
          transform: [...tallest.transform.slice(0, 4), parts[0].transform[4], tallest.transform[5]] }] : [];
      }
    }
    if (!amounts.length && volume && fields.viscosity && kind) {
      const grade = group.items.find((item) => technicalFields(item.str).viscosity);
      const candidate = group.items.filter((item) => item.confidence !== undefined && item.width > 15
        && item.transform[4] < (grade?.transform[4] || 0) * 0.4
        && !/^(?:ریال|تومان)$/.test(normalizeText(item.str)))
        .sort((a, b) => a.transform[4] - b.transform[4])[0];
      if (candidate) amounts = [candidate]; // OCR only: the bounded number must still pass image verification.
    }
    if (!amounts.length) {
      if (/روغن\s*موتور|موتور\s*(?:روغن|بنزینی|دیزلی)/.test(normalized)) { kind = "روغن موتور"; kindY = group.y; }
      if (/سیکلت/.test(normalized)) { kind = "روغن موتورسیکلت"; kindY = group.y; }
      continue;
    }
    const api = fields.api || apiAnchors.filter((anchor) => anchor.y > group.y && anchor.y < kindY)
      .sort((a, b) => a.y - b.y)[0]?.api || "";
    if (amounts.length !== 1 || !volume || !fields.viscosity || !(fields.api || api) || !kind) continue;
    const price = amounts[0], y = price.transform[5], height = price.height || 10;
    rows.push({ supplier, name: kind, specs: text, api: fields.api || api, viscosity: fields.viscosity, volume,
      amount: price.str, source: text,
      priceBounds: { left: Math.min(price.transform[4], ...group.items.filter((item) => moneyRight && item.transform[4] < moneyRight).map((item) => item.transform[4])) - 6,
        right: rowMoneyRight || price.transform[4] + price.width + 6,
        top: y + height * 1.3, bottom: y - height * 0.3 },
      identityBounds: { left: rowMoneyRight ? rowMoneyRight + 40 : price.transform[4] + price.width + 8,
        right: Math.max(...group.items.map((item) => item.transform[4] + item.width)) + 4,
        top: y + height * 1.3, bottom: y - height * 0.3 },
    });
  }
  return rows.length ? { supplier, unit: tableUnit(full), basis: "item", rows, technicalLayout: true } : null;
}
