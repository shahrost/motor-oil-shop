// ساخت شیت‌های جدولی اکسل گزارش سفارش‌ها: راست‌چین، سطر عنوان ثابت و پررنگ،
// اعداد واقعی با جداکننده‌ی هزارگان، فونت فارسی خوانا و ردیف «جمع کل»
const FONT = { name: "Tahoma", size: 11 };

const NUMBER_FORMAT = "#,##0";

const HEADER_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFACC15" } };

const TOTAL_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE5E7EB" } };

const THIN_BORDER = { style: "thin", color: { argb: "FFD1D5DB" } };

const BORDER = { top: THIN_BORDER, bottom: THIN_BORDER, left: THIN_BORDER, right: THIN_BORDER };

// columns: [{ header, key, width, number? }] ؛ number: عدد با جداکننده‌ی هزارگان
// totalKeys: کلید ستون‌هایی که در ردیف آخر جمع زده می‌شن (فرمول SUM + مقدار محاسبه‌شده)
function addTableSheet(workbook, { name, columns, rows, totalKeys = [] }) {
  const sheet = workbook.addWorksheet(name, {
    views: [{ state: "frozen", ySplit: 1, rightToLeft: true }],
  });

  sheet.columns = columns.map(({ header, key, width, number }) => ({
    header,
    key,
    width,
    style: { font: FONT, ...(number && { numFmt: NUMBER_FORMAT }) },
  }));

  rows.forEach((row) => sheet.addRow(row));

  const header = sheet.getRow(1);
  header.height = 26;
  header.eachCell((cell) => {
    cell.font = { ...FONT, bold: true };
    cell.fill = HEADER_FILL;
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  });

  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };

  const lastDataRow = rows.length + 1;

  const totalRow = sheet.addRow({ [columns[0].key]: "جمع کل" });

  totalKeys.forEach((key) => {
    const letter = sheet.getColumn(key).letter;
    const result = rows.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);

    totalRow.getCell(key).value = {
      formula: `SUM(${letter}2:${letter}${lastDataRow})`,
      result,
    };
  });

  totalRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { ...FONT, bold: true };
    cell.fill = TOTAL_FILL;
  });

  sheet.eachRow((row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = BORDER;
    });
  });

  return sheet;
}

module.exports = { addTableSheet };
