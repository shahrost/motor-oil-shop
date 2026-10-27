// خواندن ردیف‌های یک شیت exceljs بر اساس نقشه‌ی ستون‌ها (مثل server/utils/excelReader.js)

import { toLatinDigits } from "../digits";

function cellToString(value) {
  if (value === null || value === undefined) return "";

  if (value instanceof Date) return value.toISOString();

  if (typeof value === "object") {
    if (Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text).join("");
    }

    if (value.result !== undefined) return cellToString(value.result);

    if (typeof value.text === "string") return value.text;

    return "";
  }

  return String(value).trim();
}

function normalizeHeader(str) {
  return String(str || "")
    .replace(/[‌\s]/g, "")
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی");
}

export function toNumber(raw) {
  const str = toLatinDigits(raw)
    .replace(/[,٬\s]/g, "")
    .replace(/[^\d.-]/g, "");

  return str === "" ? 0 : Number(str) || 0;
}

export function readSheetRows(sheet, columnMap, requiredKeys) {
  const normalizedMap = Object.fromEntries(
    Object.entries(columnMap).map(([label, key]) => [
      normalizeHeader(label),
      key,
    ]),
  );

  const headers = [];
  const foundKeys = new Set();

  sheet.getRow(1).eachCell((cell, colNumber) => {
    const key = normalizedMap[normalizeHeader(cellToString(cell.value))];

    headers[colNumber] = key;

    if (key) foundKeys.add(key);
  });

  const missing = requiredKeys.filter((key) => !foundKeys.has(key));

  if (missing.length) {
    const labelByKey = Object.fromEntries(
      Object.entries(columnMap).map(([label, key]) => [key, label]),
    );

    throw new Error(
      `ستون(های) الزامی در فایل پیدا نشد: ${missing
        .map((key) => `«${labelByKey[key]}»`)
        .join("، ")}`,
    );
  }

  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const record = { __row: rowNumber };

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const key = headers[colNumber];

      if (key) record[key] = cellToString(cell.value);
    });

    if (Object.keys(record).length > 1) rows.push(record);
  });

  return rows;
}
