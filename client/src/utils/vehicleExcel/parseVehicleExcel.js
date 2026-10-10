import {
  LIST_SHEET,
  LINKS_SHEET,
  SIMPLE_COLUMN_MAP,
  LIST_COLUMN_MAP,
  LINKS_COLUMN_MAP,
} from "./vehicleColumns";
import { readSheetRows } from "./excelReader";
import { simpleRowToDoc, listRowToDoc, buildLinksMap } from "./vehicleRowMapper";

// پردازش فایل اکسل خودروها توی خود مرورگر (سرور CPU کمی داره و خوندن اکسل بزرگ
// اونجا خیلی کند می‌شه). خروجی: [{ row, image, sku, name, brand, ..., productLinks }]

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
