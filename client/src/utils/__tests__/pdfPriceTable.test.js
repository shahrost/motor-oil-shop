import { describe, expect, it } from "vitest";
import { readPdfPriceTable } from "../../components/Admin/PriceManager/helpers/pdfPriceTable";
import { rowsFromPages, suggestTableProduct, volumeInMl } from "../../components/Admin/PriceManager/helpers/priceListHelpers";

const ops = { constructPath: 1, save: 2, restore: 3, transform: 4, fill: 22, eoFill: 23 };
const text = (str, x, y, width = 25) => ({ str, width, height: 8, transform: [8, 0, 0, 8, x, y] });
const rectangle = (x0, y0, x1, y1) => [ops.fill, [[0, x0, y0, 1, x1, y0, 1, x1, y1, 1, x0, y1, 4]], [x0, y0, x1, y1]];

function sampleTable() {
  const paths = [];
  for (const x of [0, 100, 160, 220, 300, 400]) paths.push(rectangle(x - 0.4, 20, x + 0.4, 100));
  for (const y of [20, 80, 100]) paths.push(rectangle(0, y - 0.4, 400, y + 0.4));
  // API and product-name columns span all three rows; viscosity and volume do not.
  for (const y of [40, 60]) {
    paths.push(rectangle(0, y - 0.4, 160, y + 0.4));
    paths.push(rectangle(220, y - 0.4, 300, y + 0.4));
  }
  const items = [text("AIDLUBE", 320, 110), text("قیمت ریال", 25, 88, 50),
    text("لیتراژ", 110, 88), text("API", 175, 88), text("SAE", 240, 88), text("نام محصول", 320, 88),
    text("SN", 180, 48), text("AIDLUBE روغن موتور", 310, 48, 80)];
  for (const [index, [price, volume, grade]] of [["1000000", "5", "0w20"], ["2000000", "4", "5w30"], ["0", "1", "10w40"]].entries()) {
    const y = 68 - index * 20;
    items.push(text(price, 25, y, 50), text(volume, 115, y), text(grade, 235, y));
  }
  return { items, operators: { fnArray: paths.map(() => ops.constructPath), argsArray: paths } };
}

describe("merged supplier price tables", () => {
  it("recovers shared quality cells without leaking them into adjacent price or volume columns", () => {
    const { items, operators } = sampleTable();
    const table = readPdfPriceTable(items, operators, ops);
    expect(table.supplier).toBe("ایدلوب");
    expect(table.unit).toBe("rial");
    expect(table.rows.map((r) => [r.amount, r.volume, r.api, r.viscosity])).toEqual([
      ["1000000", "5", "sn", "0w20"], ["2000000", "4", "sn", "5w30"], ["0", "1", "sn", "10w40"],
    ]);
    expect(table.rows.every((r) => r.name.includes("روغن موتور"))).toBe(true);
    expect(rowsFromPages([{ page: 1, table }], []).every((r) => !r.selected)).toBe(true);
  });
  it("uses coordinates without borders and isolates an ambiguous price cell", () => {
    const { items, operators } = sampleTable();
    const borderless = readPdfPriceTable(items, { fnArray: [], argsArray: [] }, ops);
    expect(borderless.coordinate).toBe(true);
    expect(borderless.rows[0].name).toBe(""); // Never borrow a merged name without borders.
    expect(readPdfPriceTable(items.map((item) => ({ ...item, str: item.str.replace("AIDLUBE", "OTHER") })), operators, ops)).toBeNull();
    const ambiguous = readPdfPriceTable([...items, text("3000000", 25, 68, 50)], operators, ops);
    expect(ambiguous.rows.map((row) => row.amount)).toEqual(["2000000", "0"]);
    expect(ambiguous.unreadable).toBe(2);
  });
  it("normalizes numeric, Persian and millilitre volumes", () => {
    expect(volumeInMl("لیتر ۵")).toBe(5000);
    expect(volumeInMl("۳۰۰ M L")).toBe(300);
    expect(volumeInMl("800CC")).toBe(800);
    expect(volumeInMl("0.8L")).toBe(800);
    expect(volumeInMl("3.5", true)).toBe(3500);
    expect(volumeInMl("", true)).toBeNull();
  });
  it("matches by brand, volume, API and viscosity and leaves duplicate catalogue entries unassigned", () => {
    const row = { supplier: "وم اویل", name: "روغن موتور بنزینی", specs: "S L 20W50", api: "sl", viscosity: "20w50", volume: "1" };
    const product = { id: "a", brand: "وم اویل", name: "روغن موتور", category: "روغن موتور", api: "SL/CF4", viscosity: "20W-50", volume: "1L" };
    const others = [{ ...product, id: "b", brand: "ایدلوب" }, { ...product, id: "c", volume: "4L" },
      { ...product, id: "d", api: "SN" }, { ...product, id: "e", name: "روغن موتورسیکلت" }];
    expect(suggestTableProduct(row, [product, ...others])?.id).toBe("a");
    expect(suggestTableProduct(row, [product, { ...product, id: "duplicate" }])).toBeNull();
    expect(suggestTableProduct({ ...row, api: "" }, [product])).toBeNull();
  });
  it("keeps automatic transmission types distinct even at the same volume", () => {
    const row = { supplier: "ایدلوب", name: "AIDLUBE ATF DX6", specs: "", api: "", viscosity: "", volume: "لیتر 1" };
    const product = { brand: "ایدلوب", name: "روغن دنده اتوماتیک", category: "روغن های گیربکس", volume: "1L" };
    expect(suggestTableProduct(row, [{ ...product, id: "iii", description: "AIDLUBE DX3" }, { ...product, id: "vi", description: "AIDLUBE DX VI" }])?.id).toBe("vi");
    expect(suggestTableProduct({ ...row, name: "AIDLUBE ATF" }, [{ ...product, id: "vi", description: "AIDLUBE DX VI" }])).toBeNull();
  });
  it("recognizes JASO motorcycle names even when Persian OCR drops the word سیکلت", () => {
    const common = { brand: "وم اویل", volume: "1L", api: "SL/CF4", viscosity: "10W-40" };
    const row = { supplier: "وم اویل", name: "موتور روغن JASO MA/MB", specs: "SL 10w40", api: "sl", viscosity: "10w40", volume: "1" };
    expect(suggestTableProduct(row, [{ ...common, id: "car", name: "روغن موتور" }, { ...common, id: "motorcycle", name: "روغن موتور سیکلت" }])?.id).toBe("motorcycle");
  });
});
