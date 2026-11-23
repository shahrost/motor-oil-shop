import { latinDigits, normalizeText, parseAmount } from "./priceListHelpers.js";
import { detectSupplier } from "./priceIdentity.js";
import { readCoordinatePriceTable, priceHeaderRole, tableUnit } from "./coordinatePriceTable.js";
import { readCodePriceTable } from "./codePriceTable.js";
import { readTechnicalPriceTable, technicalVolume } from "./technicalPriceTable.js";

const compact = (value) => normalizeText(value).replace(/[\s\u200c-]+/g, "");
const point = (item) => ({
  x: item.transform[4] + item.width / 2,
  y: item.transform[5] + item.height * 0.4,
});

function multiply(a, b) {
  return [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
}

// Word/Excel PDF exports draw borders as thin filled rectangles. Read those borders
// to recover merged cells; a centred "SN" belongs to every row inside its cell.
function tableLines(operatorList, ops) {
  const horizontal = [], vertical = [], stack = [];
  let matrix = [1, 0, 0, 1, 0, 0];
  for (let i = 0; i < operatorList.fnArray.length; i += 1) {
    const op = operatorList.fnArray[i], args = operatorList.argsArray[i];
    if (op === ops.save) stack.push([...matrix]);
    else if (op === ops.restore) matrix = stack.pop() || [1, 0, 0, 1, 0, 0];
    else if (op === ops.transform) matrix = multiply(matrix, args);
    else if (op === ops.constructPath) {
      const stroked = [ops.stroke, ops.closeStroke, ops.fillStroke, ops.eoFillStroke, ops.closeFillStroke, ops.closeEOFillStroke]
        .filter((value) => value !== undefined).includes(args[0]);
      const transform = (x, y) => ({ x: matrix[0] * x + matrix[2] * y + matrix[4],
        y: matrix[1] * x + matrix[3] * y + matrix[5] });
      const segment = (a, b) => {
        if (Math.abs(a.y - b.y) < 2 && Math.abs(a.x - b.x) > 15) horizontal.push({ left: Math.min(a.x, b.x), right: Math.max(a.x, b.x), y: (a.y + b.y) / 2 });
        if (Math.abs(a.x - b.x) < 2 && Math.abs(a.y - b.y) > 15) vertical.push({ bottom: Math.min(a.y, b.y), top: Math.max(a.y, b.y), x: (a.x + b.x) / 2 });
      };
      for (const rawPath of args[1] || []) {
        const paths = [];
        if (!stroked && rawPath.length > 13) {
          for (let n = 0; n + 12 < rawPath.length; n++) {
            if (rawPath[n] === 0 && rawPath[n + 3] === 1 && rawPath[n + 6] === 1 && rawPath[n + 9] === 1 && rawPath[n + 12] === 4) {
              paths.push(rawPath.slice(n, n + 13)); n += 12;
            }
          }
        } else paths.push(rawPath);
        for (const path of paths) {
        if (stroked) {
          let previous, first;
          for (let n = 0; n < path.length;) {
            const command = path[n++];
            if (command === 0 || command === 1) {
              const next = transform(path[n++], path[n++]);
              if (command === 1 && previous) segment(previous, next);
              else first = next;
              previous = next;
            } else if (command === 4) { if (previous && first) segment(previous, first); }
            else break; // Curves/logos are not table borders.
          }
          continue;
        }
        // PDF.js 6 encodes moveTo=0, lineTo=1, closePath=4. Ignore curves and logos.
        if (path.length !== 13 || path[0] !== 0 || path[3] !== 1 || path[6] !== 1 || path[9] !== 1 || path[12] !== 4) continue;
        const points = [1, 4, 7, 10].map((n) => ({
          x: matrix[0] * path[n] + matrix[2] * path[n + 1] + matrix[4],
          y: matrix[1] * path[n] + matrix[3] * path[n + 1] + matrix[5],
        }));
        const left = Math.min(...points.map((p) => p.x)), right = Math.max(...points.map((p) => p.x));
        const bottom = Math.min(...points.map((p) => p.y)), top = Math.max(...points.map((p) => p.y));
        if (top - bottom <= 3 && right - left > 15) horizontal.push({ left, right, y: (top + bottom) / 2 });
        if (right - left <= 3 && top - bottom > 15) vertical.push({ bottom, top, x: (left + right) / 2 });
        }
      }
    }
  }
  return { horizontal, vertical };
}

function cellAt(x, y, lines) {
  const h = lines.horizontal.filter((line) => line.left < x && line.right > x);
  const v = lines.vertical.filter((line) => line.bottom < y && line.top > y);
  const left = Math.max(...v.filter((line) => line.x < x).map((line) => line.x));
  const right = Math.min(...v.filter((line) => line.x > x).map((line) => line.x));
  const bottom = Math.max(...h.filter((line) => line.y < y).map((line) => line.y));
  const top = Math.min(...h.filter((line) => line.y > y).map((line) => line.y));
  return [left, right, bottom, top].every(Number.isFinite) ? { left, right, bottom, top } : null;
}

function joinCell(items) {
  return items.sort((a, b) => {
    if (Math.abs(a.transform[5] - b.transform[5]) > Math.min(a.height, b.height) * 0.5) return b.transform[5] - a.transform[5];
    return a.transform[4] - b.transform[4];
  }).map((item) => item.str).join(" ").replace(/\s+/g, " ").trim();
}

export function detectPriceSupplier(text, brands = []) {
  return detectSupplier(text, brands);
}

export function readPdfPriceTable(items, operatorList, ops, options = {}) {
  const lines = tableLines(operatorList, ops);
  const current = readPriceTableFromLines(items, lines, options) || readCoordinatePriceTable(items, options)
    || readCodePriceTable(items, options.products) || readTechnicalPriceTable(items, options);
  if (current || !options.template || items.some((item) => priceHeaderRole(item.str) === "price")) return current;
  const template = options.template;
  const expectedEdges = [...new Set(template.headers.flatMap((h) => [h.left, h.right]))];
  if (expectedEdges.filter((x) => lines.vertical.some((line) => Math.abs(line.x - x) < 2 && line.top - line.bottom > 30)).length < expectedEdges.length * 0.8) return null;
  const top = Math.max(...lines.horizontal.map((line) => line.y));
  if (!Number.isFinite(top) || !template.headers?.length) return null;
  const left = Math.min(...template.headers.map((h) => h.left)), right = Math.max(...template.headers.map((h) => h.right));
  const headings = template.headers.map((h) => ({ ...h.item, transform: [1, 0, 0, 1, h.item.transform[4], top + 8] }));
  const headerLines = { horizontal: [...lines.horizontal, { left, right, y: top + 24 }],
    vertical: [...lines.vertical, ...template.headers.flatMap((h) => [h.left, h.right])
      .map((x) => ({ x, bottom: top, top: top + 24 }))] };
  return readPriceTableFromLines([...items, ...headings], headerLines,
    { ...options, supplier: template.supplier, unit: template.unit, singleHeader: true });
}

export function readPriceTableFromLines(items, lines, options = {}) {
  if (!options.promotionSelected) {
    const promotion = readPromotionPriceTable(items, lines, options);
    if (promotion) return promotion;
  }
  const fullText = items.map((item) => item.str || "").join(" ");
  let supplier = options.supplier || "";
  const priceHeaders = options.priceHeader ? [options.priceHeader] : items.filter((item) => priceHeaderRole(item.str) === "price");
  if (!supplier && priceHeaders.length) {
    const headerY = Math.max(...priceHeaders.map((item) => point(item).y));
    supplier = detectPriceSupplier(items.filter((item) => point(item).y >= headerY).map((item) => item.str).join(" "), options.brands);
  }
  supplier ||= detectPriceSupplier(fullText, options.brands);
  if (priceHeaders.length > 1 && !options.singleHeader) {
    const sorted = priceHeaders.sort((a, b) => point(b).y - point(a).y);
    // More than one money heading on the same row is ambiguous.
    if (sorted.some((item, i) => i && Math.abs(point(item).y - point(sorted[i - 1]).y) < item.height)) return null;
    const tables = sorted.map((header, index) => {
      const top = point(header).y + header.height * 1.2;
      const bottom = index + 1 < sorted.length ? point(sorted[index + 1]).y + sorted[index + 1].height * 1.2 : -Infinity;
      return readPriceTableFromLines(items.filter((item) => point(item).y <= top && point(item).y > bottom), lines,
        { ...options, supplier, unit: options.unit || tableUnit(fullText), singleHeader: true });
    }).filter(Boolean);
    if (!tables.length || tables.some((table) => table.unit !== tables[0].unit || table.basis !== tables[0].basis)) return null;
    return { supplier, unit: tables[0].unit, basis: tables[0].basis, rows: tables.flatMap((table) => table.rows) };
  }
  if (priceHeaders.length !== 1) return null;
  const header = priceHeaders[0];
  if (!header) return null;
  const headerPoint = point(header), priceCell = cellAt(headerPoint.x, headerPoint.y, lines);
  if (!priceCell) return null;
  const headers = items.filter((item) => {
    const p = point(item), cell = cellAt(p.x, p.y, lines);
    return cell && Math.abs(cell.bottom - priceCell.bottom) < 2 && cell.top > priceCell.bottom;
  }).map((item) => ({ item, cell: cellAt(point(item).x, point(item).y, lines) }));
  const prices = items.filter((item) => {
    const p = point(item), amount = parseAmount(item.str);
    return p.x > priceCell.left && p.x < priceCell.right && p.y < priceCell.bottom && amount !== null;
  });
  const rows = [];
  for (const price of prices.sort((a, b) => b.transform[5] - a.transform[5])) {
    const p = point(price), bounds = cellAt(p.x, p.y, lines);
    if (!bounds) continue;
    // A price cell containing multiple numbers needs the general review flow.
    if (prices.filter((other) => point(other).y > bounds.bottom && point(other).y < bounds.top).length !== 1) continue;
    const cells = new Map();
    for (const item of items.filter((item) => item.str?.trim())) {
      const ip = point(item), cell = cellAt(ip.x, ip.y, lines);
      if (!cell || (cell.left < priceCell.right - 1 && cell.right > priceCell.left + 1)
        || p.y <= cell.bottom || p.y >= cell.top || ip.y > priceCell.bottom) continue;
      const key = `${Math.round(cell.left)}:${Math.round(cell.right)}`;
      if (!cells.has(key)) cells.set(key, { ...cell, items: [] });
      cells.get(key).items.push(item);
    }
    const columns = [...cells.values()].sort((a, b) => b.left - a.left).map((cell) => ({
      ...cell, text: joinCell(cell.items),
      header: headers.filter((h) => h.cell && h.cell.left < cell.right - 2 && h.cell.right > cell.left + 2).map((h) => h.item.str).join(" "),
    }));
    let volume = columns.find((c) => priceHeaderRole(c.header) === "volume")?.text || "";
    const carton = columns.find((c) => priceHeaderRole(c.header) === "carton")?.text || "";
    const name = columns.find((c) => priceHeaderRole(c.header) === "name")?.text || "";
    volume ||= technicalVolume(name);
    const code = columns.find((c) => priceHeaderRole(c.header) === "code")?.text || "";
    const specs = columns.filter((c) => priceHeaderRole(c.header) === "specs").map((c) => c.text).join(" ");
    const technical = compact(specs + " " + name).replace(/w+/g, "w").replace(/cl4/g, "ci4");
    const api = technical.match(/s[pqnmljcfed]|c[ikj]4|c[dfce]|gl[45]/i)?.[0] || "";
    const grade = normalizeText(name + " " + specs).match(/\b(0|5|10|15|20|25)\s*-\s*(20|30|40|50|60)\b/);
    const viscosity = technical.match(/\d{1,2}w\d{2}|\d{2}w\b/i)?.[0] || technical.match(/sae(\d{2,3})/i)?.[1]
      || (grade && /^s|^c/.test(api) ? `${grade[1]}w${grade[2]}` : "");
    const rowBrand = columns.find((c) => priceHeaderRole(c.header) === "brand")?.text;
    rows.push({ supplier: (rowBrand && detectPriceSupplier(rowBrand, options.brands)) || supplier,
      code, amount: latinDigits(price.str).trim(), volume, carton, name, specs, api, viscosity,
      priceBounds: bounds, priceConfidence: price.confidence ?? 100,
      source: `${supplier} · ${columns.map((c) => c.text).filter(Boolean).join(" · ")} · ${price.str}` });
  }
  const unit = options.unit || tableUnit(fullText);
  const basis = /کارتن|carton/i.test(header.str) ? "carton" : "item";
  return rows.length && (supplier || rows.some((row) => row.supplier || row.code))
    ? { supplier, unit, basis, rows, unreadable: prices.length - rows.length,
      ...(options.promotionSelected ? { priceSource: "net-credit-after-bonus" } : {}),
      template: { supplier, unit, headers: headers.filter((h) => h.cell).map((h) => ({
        left: h.cell.left, right: h.cell.right, item: h.item,
      })) } } : null;
}

// The owner selected the final credit price after promotional bonuses. A merged
// parent heading must explicitly identify that final-price group; regular base,
// cash and credit headings do not qualify by themselves.
function readPromotionPriceTable(items, lines, options) {
  const selected = [];
  for (const item of items.filter((item) => /اعتبار|چکی/.test(normalizeText(item.str)))) {
    const p = point(item), cell = cellAt(p.x, p.y, lines);
    if (!cell) continue;
    const parent = cellAt(p.x, cell.top + 3, lines);
    if (!parent || parent.top - cell.top > 120) continue;
    const text = joinCell(items.filter((entry) => {
      const q = point(entry);
      return q.x > parent.left && q.x < parent.right && q.y > parent.bottom && q.y < parent.top;
    }));
    if (!/تمام\s*شده|نهایی|کسر\s*تخفیف|اشانتیون/.test(normalizeText(text))) continue;
    selected.push({ item, unit: tableUnit(text) });
  }
  if (!selected.length) return null;
  const tables = selected.map(({ item, unit }) => readPriceTableFromLines(items, lines,
    { ...options, priceHeader: item, promotionSelected: true, unit: unit || options.unit })).filter(Boolean);
  if (!tables.length || tables.some((table) => table.unit !== tables[0].unit)) return null;
  return { ...tables[0], rows: tables.flatMap((table) => table.rows) };
}
