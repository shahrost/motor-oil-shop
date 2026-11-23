import { describe, expect, it } from "vitest";
import fixtures from "../../../test/fixtures/supplier-price-tables.json";
import { readPdfPriceTable, readPriceTableFromLines } from "../../components/Admin/PriceManager/helpers/pdfPriceTable";
import { automaticPricePlan } from "../../components/Admin/PriceManager/helpers/automaticPricePlan";
import { parseAmount, suggestTableProduct } from "../../components/Admin/PriceManager/helpers/priceListHelpers";
import { detectSupplier, exactSkuProducts } from "../../components/Admin/PriceManager/helpers/priceIdentity";
import { priceHeaderRole, readCoordinatePriceTable } from "../../components/Admin/PriceManager/helpers/coordinatePriceTable";
import { readCodePriceTable } from "../../components/Admin/PriceManager/helpers/codePriceTable";
import { readTechnicalPriceTable } from "../../components/Admin/PriceManager/helpers/technicalPriceTable";

const brands = ["ادینول", "ایدلوب", "بهتام", "وم اویل", "لوکینی", "ووفر", "توتال", "سمن شیمی", "فیلتر میهن", "فیلتر لوکومبیل"];
const fixture = (source, page = 1) => fixtures.find((entry) => entry.source.includes(source) && entry.page === page);
const read = (source, page) => { const f = fixture(source, page); return readPriceTableFromLines(f.items, f.lines, { brands }); };
const item = (str, x, y, width = 40) => ({ str, width, height: 10, transform: [1,0,0,1,x,y] });
const product = { id: "add", sku: "ADD-ENGINE", brand: "ادینول", name: "روغن موتور", volume: "4L", api: "SP", viscosity: "10W-40", price: 0, priceCheck: 0 };

describe("supplied supplier price-list formats", () => {
  it.each([
    ["addinol aban", 36, "143,880,000"], ["aidlub", 27, "165,000,000"],
    ["بهتام", 21, "67,100,000"], ["لوکيني", 18, "0"], ["توتال", 19, "150,000,000"],
    ["میهن", 23, "2,711,125"], ["seman shimi", 31, "3,510,000"], ["وم اویل", 18, "8,900,000"],
    ["mehr.pdf", 47, "0"],
  ])("recovers %s rows and the exact first list amount", (source, count, amount) => {
    const table = read(source);
    expect(table.rows).toHaveLength(count);
    expect(table.rows[0].amount).toBe(amount);
    expect(table.rows.every((row) => parseAmount(row.amount) !== null)).toBe(true);
  });

  it("matches Addinol independently of Aidlube, with aliases and normalized specs", () => {
    const row = read("addinol aban").rows[0];
    const pages = [{ page: 1, table: { ...read("addinol aban"), rows: [row] } }];
    const plan = automaticPricePlan(pages, [product, { ...product, id: "wrong-brand", brand: "ایدلوب" }], 8);
    expect(plan.changes).toMatchObject([{ id: "add", price: 13236960, priceCheck: 14388000 }]);
    expect(suggestTableProduct({ ...row, supplier: "ADDINOL" }, [product])?.id).toBe("add");
  });

  it("keeps a source's credit column separate from cash and never guesses an absent currency", () => {
    const table = read("seman shimi");
    expect(table.unit).toBe("");
    expect(table.rows[0].amount).toBe("3,510,000");
    expect(table.rows[0].amount).not.toBe("3,190,000");
    expect(automaticPricePlan([{ page: 1, table }], [product], 8).changes).toEqual([]);
  });

  it("continues a headerless page using the previous page's bounded columns", () => {
    const first = read("میهن"), next = fixture("میهن", 2);
    const ops = { constructPath: 91, fill: 22 };
    const rectangles = [
      ...next.lines.horizontal.map((line) => [line.left, line.y - 0.2, line.right, line.y + 0.2]),
      ...next.lines.vertical.map((line) => [line.x - 0.2, line.bottom, line.x + 0.2, line.top]),
    ].map(([l,b,r,t]) => [22, [[0,l,b,1,r,b,1,r,t,1,l,t,4]]]);
    const table = readPdfPriceTable(next.items, { fnArray: rectangles.map(() => 91), argsArray: rectangles }, ops,
      { brands, template: first.template });
    expect(table.rows[0]).toMatchObject({ code: "MFO57221", amount: "5,455,140", supplier: "فیلتر میهن" });
  });

  it("reads prices printed next to exact ATFO codes without a price heading", () => {
    const f = fixture("AFTO");
    const products = ["ATFO-TL001", "ATFO-TL001W", "ATFO-TL002", "ATFO-TL002W"].map((sku) => ({ id: sku, sku, brand: "فیلتر گیربکس ATFO" }));
    const table = readCodePriceTable(f.items, products);
    expect(table.rows.slice(0, 3).map((row) => [row.code, parseAmount(row.amount)])).toEqual([
      ["ATFO-TL001", 1312000], ["ATFO-TL001W", 844000], ["ATFO-TL002", 1800000],
    ]);
  });

  it("does not confuse filter text with the price heading or SKU suffixes", () => {
    expect(priceHeaderRole("فیلتر روغن")).not.toBe("price");
    expect(priceHeaderRole("فی(ریال)")).toBe("price");
    const products = [{ id: "a", sku: "LO666/01" }, { id: "b", sku: "LO666/01-1" }];
    expect(exactSkuProducts("LO666/01-1", products).map((p) => p.id)).toEqual(["b"]);
    expect(detectSupplier("فناوران نوین", ["فناوران نوین"])).toBe("فناوران نوین");
  });

  it("uses unknown part numbers as row barriers instead of borrowing their prices", () => {
    const p = { id: "a", sku: "KNOWN-001", brand: "برند تازه" };
    const text = (str, x, y) => ({ ...item(str,x,y), height: 8 });
    expect(readCodePriceTable([text(p.sku,200,100), text("UNKNOWN-002",200,80), text("250000",0,78)], [p])).toBeNull();
  });

  it("reads section-based technical lists without borrowing an API from the next section", () => {
    const source = [item("WOM OIL",0,350), item("روغن موتور بنزینی",100,300),
      item("20W50 / 10W40",0,250), item("SL",300,250),
      item("1000000",0,200), item("ریال",90,200), item("1 لیتر",150,200), item("20W50",300,200),
      item("SN",300,150), item("2000000",0,100), item("ریال",90,100), item("4 لیتر",150,100), item("5W40",300,100)];
    const table = readTechnicalPriceTable(source);
    expect(table.rows.map((row) => [row.api,row.viscosity,row.volume,row.amount])).toEqual([
      ["sl","20w50","1L","1000000"], ["sn","5w40","4L","2000000"],
    ]);
    expect(readTechnicalPriceTable(source.filter((i) => !i.str.includes("موتور")))).toBeNull();
  });

  it("updates every catalogue brand by exact SKU and refuses contradictory brand or volume", () => {
    const p = { id: "new", sku: "NEW-FILTER-01", brand: "برند تازه", name: "فیلتر" };
    const table = { unit: "toman", basis: "item", supplier: "", rows: [{ code: p.sku, amount: "250000", source: p.sku }] };
    expect(automaticPricePlan([{ page: 1, table }], [p], 8).changes[0]).toMatchObject({ id: "new", price: 230000 });
    expect(suggestTableProduct({ code: product.sku, supplier: "ایدلوب" }, [product])).toBeNull();
    expect(suggestTableProduct({ code: product.sku, volume: "5L" }, [product])).toBeNull();
    expect(suggestTableProduct({ code: product.sku, volume: "4kg" }, [product])).toBeNull();
  });

  it("never updates inconsistent image identities or unknown/multiple money columns", () => {
    const row = { ...read("addinol aban").rows[0], verifiedPrice: true, verifiedIdentity: false };
    expect(automaticPricePlan([{ page: 1, image: true, table: { supplier: "ادینول", unit: "rial", basis: "item", rows: [row] } }], [product], 8).changes).toEqual([]);
    expect(readCoordinatePriceTable([item("قیمت ریال", 0, 100), item("قیمت تومان", 100, 100), item("کد", 200, 100), item("100000", 0, 70), item("NEW-FILTER-01", 200, 70)])).toBeNull();
    const p = { id: "a", sku: "FILTER-1", brand: "برند تازه" };
    const table = readCoordinatePriceTable([item("قیمت تومان", 0, 100), item("کد", 200, 100), item("100000", 0, 70), item(p.sku, 200, 70)]);
    expect(automaticPricePlan([{ page: 1, table }], [p], 8).changes[0]?.id).toBe("a");
  });
});
