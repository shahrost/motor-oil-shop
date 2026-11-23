import { normalizeText, parseAmount } from "./priceListHelpers.js";
import { detectSupplier } from "./priceIdentity.js";

export function priceHeaderRole(value) {
  const text = normalizeText(value).replace(/\s/g, "");
  if (/لیست.*قیمت|pricelist|قیمت.*محص[وول]/.test(text)) return "";
  if (/قیمت|مبلغ|price|amount|^فی(?:\(|ریال|تومان|$)/.test(text)) return /نقد|cash/.test(text) ? "cashPrice" : "price";
  if (/تعداد|کارتن|بسته|carton|quantity|qty/.test(text)) return "carton";
  if (/لیت|حجم|وزن|volume|size|litre|liter/.test(text)) return "volume";
  if (/کد|شناسه|sku|code|partnumber/.test(text)) return "code";
  if (/برند|شرکت|brand/.test(text)) return "brand";
  if (/نام|شرح|محصول|کالا|description|product|name/.test(text)) return "name";
  if (/فن|کیفی|api|sae|گرانروی|ویسکوز|spec|grade/.test(text)) return "specs";
  if (/ردیف|row/.test(text)) return "index";
  return "";
}

export function tableUnit(value) {
  const text = normalizeText(value);
  const toman = /تومان|toman/.test(text), rial = /ریال|rial/.test(text);
  return toman === rial ? "" : toman ? "toman" : "rial";
}

export function technicalFields(specs) {
  const text = normalizeText(specs).replace(/[\s-]/g, "");
  return { api: text.match(/s[pqnmlj]|c[kij]4|gl[45]/)?.[0] || "",
    viscosity: text.match(/\d{1,2}w\d{2}|\d{2}w\b/)?.[0] || "" };
}

const center = (item) => item.transform[4] + (item.width || 0) / 2;
const baseline = (item) => item.transform[5] + (item.height || 8) * 0.4;

// Borderless exports and photos: use explicit headings and visual coordinates.
// Do not turn arbitrary OCR lines or multiple money columns into automatic updates.
export function readCoordinatePriceTable(items, { brands = [], supplier = "", unit = "" } = {}) {
  const clean = items.filter((item) => item.str?.trim() && item.transform);
  const candidates = clean.filter((item) => priceHeaderRole(item.str) === "price");
  for (const header of candidates) {
    const height = Math.max(8, header.height || 8), y = baseline(header);
    const headerItems = clean.filter((item) => Math.abs(baseline(item) - y) < height * 1.4);
    // Combine adjacent words from the same heading, using a gap relative to text height.
    const groups = [];
    for (const item of [...headerItems].sort((a, b) => a.transform[4] - b.transform[4])) {
      const last = groups.at(-1);
      const role = priceHeaderRole(item.str), lastRole = last && priceHeaderRole(last.items.map((entry) => entry.str).join(" "));
      if (last && item.transform[4] - last.right < height * 0.7
        && (!role || !lastRole || (role === lastRole && item.transform[4] - last.left < height * 3))) {
        last.items.push(item); last.right = Math.max(last.right, item.transform[4] + item.width);
      } else groups.push({ left: item.transform[4], right: item.transform[4] + item.width, items: [item] });
    }
    const columns = groups.map((group) => ({ ...group,
      text: group.items.map((item) => item.str).join(" "), x: (group.left + group.right) / 2,
    })).map((group) => ({ ...group, role: priceHeaderRole(group.text) })).filter((group) => group.role);
    if (columns.filter((c) => c.role === "price").length !== 1
      || !columns.some((c) => ["name", "code"].includes(c.role))) continue;
    for (let i = 0; i < columns.length; i++) {
      columns[i].leftBound = i ? (columns[i - 1].right + columns[i].left) / 2 : -Infinity;
      columns[i].rightBound = i + 1 < columns.length ? (columns[i].right + columns[i + 1].left) / 2 : Infinity;
    }
    const priceColumn = columns.find((c) => c.role === "price");
    const body = clean.filter((item) => baseline(item) < y - height);
    const money = body.filter((item) => center(item) > priceColumn.leftBound && center(item) < priceColumn.rightBound
      && parseAmount(item.str) !== null).sort((a, b) => baseline(b) - baseline(a));
    if (!money.length) continue;
    if (money.some((item, index) => index && Math.abs(baseline(item) - baseline(money[index - 1])) < height * 0.5)) return null;
    const text = clean.map((item) => item.str).join(" ");
    const company = supplier || detectSupplier(text, brands);
    const rows = money.map((price, index) => {
      const py = baseline(price);
      const distances = [index ? baseline(money[index - 1]) - py : Infinity,
        index + 1 < money.length ? py - baseline(money[index + 1]) : Infinity];
      // Never borrow a name/spec from another row. Tall merged cells need borders.
      const tolerance = Math.min(Math.max(height, price.height || 8) * 0.75, ...distances.map((d) => d * 0.4));
      const cells = columns.map((column) => ({ ...column, value: body.filter((item) =>
        Math.abs(baseline(item) - py) <= tolerance && center(item) > column.leftBound && center(item) < column.rightBound)
        .sort((a, b) => a.transform[4] - b.transform[4]).map((item) => item.str).join(" ") }));
      const value = (role) => cells.filter((c) => c.role === role).map((c) => c.value).join(" ");
      const source = cells.map((c) => c.value).filter(Boolean).join(" · ");
      return { supplier: detectSupplier(value("brand") || source, brands) || company,
        name: value("name"), code: value("code"), volume: value("volume"), carton: value("carton"),
        specs: value("specs"), ...technicalFields(value("specs")), amount: price.str,
        source, priceConfidence: price.confidence ?? 100,
        priceBounds: { left: Number.isFinite(priceColumn.leftBound) ? priceColumn.leftBound : Math.max(0, price.transform[4] - height),
          right: Number.isFinite(priceColumn.rightBound) ? priceColumn.rightBound : price.transform[4] + price.width + height,
          top: py + tolerance, bottom: py - tolerance },
      };
    });
    if (!company && !rows.some((row) => row.supplier || row.code)) continue;
    return { supplier: company, unit: unit || tableUnit(priceColumn.text) || tableUnit(text),
      basis: /کارتن|carton/i.test(priceColumn.text) ? "carton" : "item", rows, coordinate: true };
  }
  return null;
}
