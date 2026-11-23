const test = require("node:test");
const assert = require("node:assert/strict");
const repository = require("../repositories/productRepository");
const { applyPriceChanges, validatePriceChanges } = require("../services/mobilePriceService");
const { auth } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const id = "64b000000000000000000001";
const body = () => ({ field: "price", changes: [{ id, price: 1250000, expectedPrice: 900000 }] });

test("rejects malformed batches and duplicate products before any writes", async () => {
  const original = repository.updatePriceIfCurrent;
  let writes = 0;
  repository.updatePriceIfCurrent = async () => { writes += 1; return {}; };
  try {
    const invalid = [undefined, {}, { ...body(), field: "stock" }, { ...body(), changes: [] },
      { ...body(), changes: [...body().changes, { ...body().changes[0], id: id.toUpperCase() }] },
      { ...body(), changes: Array(101).fill(body().changes[0]) }];
    for (const value of [-1, 1.1, "1250000", NaN, Infinity, 1e13, null]) {
      invalid.push({ ...body(), changes: [{ id, price: value, expectedPrice: 1 }] });
      invalid.push({ ...body(), changes: [{ id, price: 1, expectedPrice: value }] });
    }
    invalid.push({ ...body(), changes: [{ id: { $ne: null }, price: 1, expectedPrice: 1 }] });
    invalid.push({ ...body(), changes: [...body().changes, null] });
    for (const request of invalid) await assert.rejects(applyPriceChanges(request), { statusCode: 400 });
    assert.equal(writes, 0);
    assert.equal(validatePriceChanges({ field: "priceCheck", changes: [{ id, price: 0, expectedPrice: 1 }] }).field, "priceCheck");
  } finally { repository.updatePriceIfCurrent = original; }
});

test("returns exact partial results and passes expected prices to compare-and-set without retry", async () => {
  const original = repository.updatePriceIfCurrent;
  const ids = [1, 2, 3, 4].map((n) => `64b00000000000000000000${n}`);
  const calls = [];
  repository.updatePriceIfCurrent = async (...args) => {
    calls.push(args);
    if (args[0] === ids[1]) return null;
    if (args[0] === ids[2]) throw new Error("database unavailable");
    return { _id: args[0] };
  };
  try {
    const result = await applyPriceChanges({ field: "priceCheck", changes: ids.map((productId, i) => ({ id: productId, price: i === 3 ? 900 : 1200, expectedPrice: 900 })) });
    assert.deepEqual(result, { updated: [{ id: ids[0], price: 1200 }], unchanged: [{ id: ids[3], price: 900 }], conflicts: [{ id: ids[1] }], failed: [{ id: ids[2] }] });
    assert.equal(calls.length, 4);
    assert.deepEqual(calls[0], [ids[0], "priceCheck", 900, 1200]);
  } finally { repository.updatePriceIfCurrent = original; }
});

test("customer, missing and invalid tokens cannot access admin price updates", () => {
  const previous = process.env.JWT_SECRET;
  process.env.JWT_SECRET = "local-price-test-secret";
  try {
    for (const token of ["", "invalid", jwt.sign({ role: "customer" }, process.env.JWT_SECRET)]) {
      let nextCalled = false;
      const res = { status(code) { assert.equal(code, 401); return this; }, json() {} };
      auth({ headers: token ? { authorization: `Bearer ${token}` } : {} }, res, () => { nextCalled = true; });
      assert.equal(nextCalled, false);
    }
    let allowed = false;
    auth({ headers: { authorization: `Bearer ${jwt.sign({ role: "admin" }, process.env.JWT_SECRET)}` } }, {}, () => { allowed = true; });
    assert.equal(allowed, true);
  } finally {
    if (previous === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previous;
  }
});

test("automatic upload updates cash and credit together with both previous prices guarded", async () => {
  const original = repository.updateBothPricesIfCurrent;
  const change = { id, price: 10583000, priceCheck: 11140000, expectedPrice: 10000000, expectedPriceCheck: 11000000 };
  const calls = [];
  repository.updateBothPricesIfCurrent = async (row) => { calls.push(row); return { _id: row.id }; };
  try {
    for (const invalid of [undefined, -1, "11000000", NaN]) {
      await assert.rejects(applyPriceChanges({ field: "prices", changes: [{ ...change, expectedPriceCheck: invalid }] }), { statusCode: 400 });
    }
    assert.equal(calls.length, 0);
    const result = await applyPriceChanges({ field: "prices", changes: [change] });
    assert.deepEqual(calls, [change]);
    assert.deepEqual(result.updated, [{ id, price: 10583000, priceCheck: 11140000 }]);
    repository.updateBothPricesIfCurrent = async () => null;
    assert.deepEqual((await applyPriceChanges({ field: "prices", changes: [change] })).conflicts, [{ id }]);
  } finally { repository.updateBothPricesIfCurrent = original; }
});
