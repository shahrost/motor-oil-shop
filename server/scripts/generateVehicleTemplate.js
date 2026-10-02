// ساخت فایل نمونه‌ی ایمپورت خودرو از دیتای پیش‌فرض کلاینت:
//   node scripts/generateVehicleTemplate.js
const path = require("path");
const { pathToFileURL } = require("url");
const ExcelJS = require("exceljs");
const { COLUMN_MAP } = require("../services/vehicleImportService");

async function main() {
  const { vehicles } = await import(
    pathToFileURL(path.join(__dirname, "../../client/src/data/vehicles.js")).href
  );

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("خودروها");
  sheet.views = [{ rightToLeft: true }];

  const keyToLabel = Object.fromEntries(
    Object.entries(COLUMN_MAP).map(([label, key]) => [key, label]),
  );
  const keys = Object.values(COLUMN_MAP);

  sheet.columns = keys.map((key) => ({
    header: keyToLabel[key],
    key,
    width: Math.max(16, keyToLabel[key].length + 4),
  }));
  sheet.getRow(1).font = { bold: true };

  vehicles.forEach((v) => {
    sheet.addRow({
      ...v,
      sku: v.id,
      viscosities: v.viscosities.join(", "),
      image: `${v.id}.jpg`,
    });
  });

  const out = path.join(__dirname, "../templates/vehicle-import-template.xlsx");
  await workbook.xlsx.writeFile(out);
  console.log("written", out, vehicles.length, "rows");
}

main();
