const fs = require("fs/promises");
const AppError = require("./AppError");
const sanitizeXlsx = require("./sanitizeXlsx");

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function cellValueToString(value) {
  if (value === null || value === undefined) return "";

  if (value instanceof Date) return value.toISOString();

  if (typeof value === "object") {
    if (Array.isArray(value.richText)) {
      return value.richText.map((part) => part.text).join("");
    }

    if (value.result !== undefined) {
      return cellValueToString(value.result);
    }

    if (typeof value.text === "string") return value.text;

    return "";
  }

  return String(value).trim();
}

function toNumber(rawValue) {
  let str = String(rawValue ?? "").trim();

  if (!str) return NaN;

  str = str
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/[,٬\s]/g, "")
    .replace(/٫/g, ".");

  str = str.replace(/[^\d.-]/g, "");

  return str === "" ? NaN : Number(str);
}

function normalizeHeader(str) {
  return String(str || "")
    .replace(/[‌\s]/g, "")
    .replace(/ك/g, "ک")
    .replace(/ي/g, "ی");
}

async function loadWorkbook(excelFile) {
  // exceljs سنگینه (~۱۱MB حافظه) و فقط موقع ایمپورت لازمه؛ همون موقع لود می‌شه نه موقع شروع سرور
  const ExcelJS = require("exceljs");

  const buffer = await fs.readFile(excelFile.path);
  const cleanBuffer = await sanitizeXlsx(buffer);

  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(cleanBuffer);
  } catch {
    throw new AppError(
      "فایل قابل خواندن نیست. فایل را دوباره از اکسل با گزینه «Save As» ذخیره کنید و دوباره تلاش کنید",
      400,
    );
  }

  return workbook;
}

// ردیف‌های یک شیت رو با نگاشت ستون‌ها می‌خونه. اگه sheetName داده نشه یا پیدا
// نشه، اولین شیت خونده می‌شه.
function readSheetRows(workbook, columnMap, requiredKeys = [], sheetName) {
  const NORMALIZED_COLUMN_MAP = Object.fromEntries(
    Object.entries(columnMap).map(([label, key]) => [normalizeHeader(label), key]),
  );

  const COLUMN_LABEL_BY_KEY = Object.fromEntries(
    Object.entries(columnMap).map(([label, key]) => [key, label]),
  );

  const sheet =
    (sheetName && workbook.getWorksheet(sheetName)) || workbook.worksheets[0];

  if (!sheet) {
    throw new AppError("فایل ورودی خالی است", 400);
  }

  const headers = [];
  const foundKeys = new Set();

  sheet.getRow(1).eachCell((cell, colNumber) => {
    const header = cellValueToString(cell.value);

    headers[colNumber] = header;

    const key = NORMALIZED_COLUMN_MAP[normalizeHeader(header)];

    if (key) foundKeys.add(key);
  });

  const missingKeys = requiredKeys.filter((key) => !foundKeys.has(key));

  if (missingKeys.length) {
    throw new AppError(
      `ستون(های) الزامی در فایل پیدا نشد: ${missingKeys
        .map((key) => `«${COLUMN_LABEL_BY_KEY[key]}»`)
        .join("، ")}. اسم ستون‌ها باید دقیقاً مطابق فایل نمونه باشد`,
      400,
    );
  }

  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const record = { __row: rowNumber };

    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      const header = headers[colNumber];
      const key = header && NORMALIZED_COLUMN_MAP[normalizeHeader(header)];

      if (!key) return;

      record[key] = cellValueToString(cell.value);
    });

    if (Object.keys(record).length === 1) return;

    // ستون‌های موجود در سرستون که خانه‌شون در این ردیف خالیه (مثلاً آخر ردیف)
    // مقدار "" می‌گیرن؛ undefined یعنی ستون اصلاً توی فایل نیست.
    foundKeys.forEach((key) => {
      if (record[key] === undefined) record[key] = "";
    });

    rows.push(record);
  });

  return rows;
}

async function readWorkbookFile(excelFile, columnMap, requiredKeys = []) {
  const workbook = await loadWorkbook(excelFile);

  return readSheetRows(workbook, columnMap, requiredKeys);
}

async function removeFileQuietly(filePath) {
  try {
    await fs.unlink(filePath);
  } catch {
    // فایل موقت است، اگر پاک نشود مشکلی برای عملکرد ایجاد نمی‌کند
  }
}

module.exports = {
  loadWorkbook,
  readSheetRows,
  readWorkbookFile,
  removeFileQuietly,
  toNumber,
};
