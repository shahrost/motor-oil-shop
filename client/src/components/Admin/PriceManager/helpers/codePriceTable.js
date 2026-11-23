import { exactSkuProducts } from "./priceIdentity.js";
import { parseAmount } from "./priceListHelpers.js";
import { tableUnit } from "./coordinatePriceTable.js";

// Filter catalogues may print a part number and price next to a photo, with no
// price heading. Accept only an exact catalogue SKU and one nearby money value.
export function readCodePriceTable(items, products = []) {
  if (!products.length) return null;
  const clean = items.filter((item) => item.str?.trim()), anchors = [];
  const prefixes = new Set(products.map((product) => product.sku?.toLowerCase().match(/^[a-z]+/)?.[0]).filter(Boolean));
  for (const item of clean) {
    const nearby = clean.filter((other) => Math.abs(other.transform[4] - item.transform[4]) < Math.max(12, item.width)
      && Math.abs(other.transform[5] - item.transform[5]) < Math.max(10, item.height) * 1.7)
      .sort((a, b) => b.transform[5] - a.transform[5] || a.transform[4] - b.transform[4]);
    const text = nearby.map((entry) => entry.str).join(" ").replace(/([a-z]+)-\s+(?=[a-z\d])/gi, "$1-");
    const exact = exactSkuProducts(text, products);
    const codes = (text.match(/\b[a-z]+(?:[-_/][a-z]*)?\d+[a-z\d/_-]*\b/gi) || [])
      .filter((code) => /[-_]/.test(code) || prefixes.has(code.toLowerCase().match(/^[a-z]+/)?.[0]));
    const product = exact.length === 1 ? exact[0] : null;
    if (!product && codes.length !== 1) continue;
    const key = product?.sku || codes[0];
    if (anchors.some((anchor) => anchor.key === key && Math.abs(anchor.y - item.transform[5]) < item.height * 2)) continue;
    // Unknown part numbers still delimit rows. Their prices must never slide
    // onto a neighbouring known product whose own price is blank.
    anchors.push({ product, key, y: item.transform[5], height: item.height });
  }
  anchors.sort((a, b) => b.y - a.y);
  const rows = [];
  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i], tolerance = Math.max(20, anchor.height * 3);
    if (!anchor.product) continue;
    const top = i ? (anchor.y + anchors[i - 1].y) / 2 : anchor.y + tolerance;
    const previousGap = i ? anchors[i - 1].y - anchor.y : tolerance;
    const bottom = i + 1 < anchors.length ? (anchor.y + anchors[i + 1].y) / 2 : anchor.y - Math.max(tolerance, previousGap * 0.8);
    const region = clean.filter((item) => item.transform[5] < top && item.transform[5] > bottom);
    const amounts = region.filter((item) => parseAmount(item.str) >= 10000);
    if (amounts.length !== 1) continue;
    const price = amounts[0], y = price.transform[5], height = price.height || 10;
    rows.push({ code: anchor.product.sku, supplier: anchor.product.brand, amount: price.str,
      name: "", specs: "", volume: "", api: "", viscosity: "",
      source: `${anchor.product.sku} · ${price.str}`,
      priceBounds: { left: price.transform[4] - 4, right: price.transform[4] + price.width + 4,
        top: y + height * 1.2, bottom: y - height * 0.3 },
    });
  }
  if (!rows.length) return null;
  const suppliers = [...new Set(rows.map((row) => row.supplier))];
  return { supplier: suppliers.length === 1 ? suppliers[0] : "", unit: tableUnit(clean.map((item) => item.str).join(" ")),
    basis: "item", rows, codeLayout: true };
}
