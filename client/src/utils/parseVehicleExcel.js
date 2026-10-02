import vehicleBrandsEn from "../data/vehicleBrandsEn";

// پردازش فایل اکسل خودروها توی خود مرورگر (سرور CPU کمی داره و خوندن اکسل بزرگ
// اونجا خیلی کند می‌شه). خروجی: [{ row, image, sku, name, brand, ..., productLinks }]
// منطق ستون‌ها باید با server/services/vehicleImportService.js هماهنگ بمونه.

const LIST_SHEET = "لیست خودروها";
const LINKS_SHEET = "ارتباط محصولات";

const SIMPLE_COLUMN_MAP = {
  "کد خودرو": "sku",
  "نام خودرو": "name",
  "نام انگلیسی خودرو": "nameEn",
  "برند خودرو": "brand",
  "برند انگلیسی": "brandEn",
  "سال ساخت": "years",
  "سال ساخت (انگلیسی)": "yearsEn",
  موتور: "engine",
  "موتور (انگلیسی)": "engineEn",
  "حجم روغن موتور (لیتر)": "oilCapacity",
  "ویسکوزیته‌های پیشنهادی": "viscosities",
  "استاندارد API": "api",
  "فاصله تعویض روغن (کیلومتر)": "interval",
  "نام فایل عکس": "image",
};

const LIST_COLUMN_MAP = {
  "کد خودرو": "sku",
  برند: "brand",
  "کشور برند": "country",
  مدل: "model",
  "تیپ / نسخه": "variant",
  "نام کامل خودرو": "fullName",
  موتور: "engine",
  "حجم موتور (لیتر)": "engineSize",
  سوخت: "fuel",
  گیربکس: "gearbox",
  بدنه: "body",
  "گروه خودروسازی / واردکننده": "maker",
  وضعیت: "status",
  "نام فایل عکس": "image",
  "ویسکوزیته پیشنهادی (اصلی)": "viscosity",
  "ویسکوزیته جایگزین": "viscosityAlt",
};

const LINKS_COLUMN_MAP = {
  "کد خودرو": "vehicleSku",
  "کد محصول": "productSku",
  "اولویت نمایش": "priority",
  "نوع توصیه": "kind",
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

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

function toNumber(raw) {
  const str = String(raw ?? "")
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/[,٬\s]/g, "")
    .replace(/[^\d.-]/g, "");

  return str === "" ? 0 : Number(str) || 0;
}

function readSheetRows(sheet, columnMap, requiredKeys) {
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
  const variant = cleanDash(row.variant);
  const name = [row.model, variant].filter(Boolean).join(" ") || row.fullName;

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

function buildLinksMap(linkRows) {
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

export default async function parseVehicleExcel(file) {
  // exceljs سنگینه؛ فقط وقتی لازمه لود می‌شه
  const { default: ExcelJS } = await import("exceljs");

  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(await file.arrayBuffer());
  } catch {
    throw new Error(
      "فایل اکسل قابل خواندن نیست. آن را در اکسل با «Save As» دوباره به صورت xlsx ذخیره کنید",
    );
  }

  const listSheet = workbook.getWorksheet(LIST_SHEET);
  const isFullFormat = Boolean(listSheet);

  const rows = isFullFormat
    ? readSheetRows(listSheet, LIST_COLUMN_MAP, ["sku", "brand"])
    : readSheetRows(workbook.worksheets[0], SIMPLE_COLUMN_MAP, [
        "sku",
        "name",
        "brand",
      ]);

  const linksSheet = isFullFormat && workbook.getWorksheet(LINKS_SHEET);

  const linksMap = linksSheet
    ? buildLinksMap(
        readSheetRows(linksSheet, LINKS_COLUMN_MAP, [
          "vehicleSku",
          "productSku",
        ]),
      )
    : null;

  return rows
    .filter((row) => row.sku)
    .map((row) => {
      const doc = isFullFormat ? listRowToDoc(row) : simpleRowToDoc(row);

      doc.sku = row.sku.toUpperCase();

      if (linksMap) doc.productLinks = linksMap.get(doc.sku) || [];

      return { ...doc, row: row.__row, image: row.image || "" };
    });
}
