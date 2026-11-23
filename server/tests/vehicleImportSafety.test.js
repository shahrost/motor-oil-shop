const test = require("node:test");
const assert = require("node:assert/strict");
const loadService = require("./helpers/loadService");

function setup(rows = []) {
  const writes = [], deletions = [], uploads = [], removedFiles = [];
  let failWrite = false;
  const service = loadService("services/vehicleImportService.js", {
    "../repositories/vehicleRepository": {
      upsertManyBySku: async (docs) => {
        if (failWrite) throw new Error("database unavailable");
        writes.push(...docs);
        return docs.length;
      },
      deleteWhereSkuNotIn: async (skus) => { deletions.push([...skus]); return []; },
    },
    "../repositories/productRepository": { findExistingSkus: async () => [] },
    "../utils/excelReader": {
      loadWorkbook: async () => ({ getWorksheet: () => null }),
      readSheetRows: () => rows,
      removeFileQuietly: async (file) => { removedFiles.push(file); },
    },
    "../utils/cloudStorage": { persistImages: async (files) => { uploads.push(...files); return new Map(); } },
  });
  return { service, writes, deletions, uploads, removedFiles, failWrites: () => { failWrite = true; } };
}

test("mapping errors abort replacement imports before uploads, writes or deletion", async () => {
  const state = setup([
    { __row: 2, sku: "GOOD", name: "خودرو", brand: "پژو", image: "car.jpg" },
    { __row: 3, sku: "EXISTING-INVALID", name: "", brand: "پژو" },
  ]);
  const result = await state.service.importVehicles({ path: "fake.xlsx" }, [
    { originalname: "car.jpg", filename: "new.jpg", path: "fake-image.jpg" },
  ], { removeMissing: true });
  assert.equal(result.failed.length, 1);
  assert.ok(result.aborted);
  assert.equal(state.writes.length, 0);
  assert.equal(state.deletions.length, 0);
  assert.equal(state.uploads.length, 0);
  assert.ok(state.removedFiles.includes("fake.xlsx"));
});

test("invalid parsed rows also abort replacement imports", async () => {
  const state = setup();
  const result = await state.service.importParsedVehicles([
    { row: 2, sku: "GOOD", name: "خودرو", brand: "پژو" },
    { row: 3, sku: "EXISTING-INVALID", name: "", brand: "پژو" },
  ], [], { removeMissing: true });
  assert.ok(result.aborted);
  assert.equal(state.writes.length, 0);
  assert.equal(state.deletions.length, 0);
});

test("ordinary imports can still save valid rows and report invalid rows", async () => {
  const state = setup();
  const result = await state.service.importParsedVehicles([
    { row: 2, sku: "GOOD", name: "خودرو", brand: "پژو" },
    { row: 3, sku: "INVALID", name: "", brand: "پژو" },
  ]);
  assert.equal(result.created, 1);
  assert.equal(result.failed.length, 1);
  assert.equal(state.deletions.length, 0);
});

test("valid replacement imports delete only after successful writes", async () => {
  const state = setup();
  await state.service.importParsedVehicles([{ row: 2, sku: "good", name: "خودرو", brand: "پژو" }], [], { removeMissing: true });
  assert.equal(state.writes.length, 1);
  assert.deepEqual(state.deletions, [["GOOD"]]);
});

test("database write failures prevent the removal phase", async () => {
  const state = setup();
  state.failWrites();
  await assert.rejects(state.service.importParsedVehicles([
    { row: 2, sku: "GOOD", name: "خودرو", brand: "پژو" },
  ], [], { removeMissing: true }), /database unavailable/);
  assert.equal(state.deletions.length, 0);
});
