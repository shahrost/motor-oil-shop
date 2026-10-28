// اجرا: npm test (node --test، بدون وابستگی اضافه)
const test = require("node:test");
const assert = require("node:assert/strict");

const validateOrder = require("../validations/orderValidation");

const validOrder = () => ({
  customer: { name: "علی", phone: "09121234567", area: "پرند", address: "خیابان ۱" },
  items: [{ productId: "64b000000000000000000001", quantity: 2, orderType: "carton" }],
});

test("سفارش معتبر قبول می‌شه", () => {
  assert.equal(validateOrder(validOrder()).valid, true);
});

test("موبایل نامعتبر رد می‌شه", () => {
  const order = validOrder();
  order.customer.phone = "9121234567";

  assert.equal(validateOrder(order).valid, false);
});

test("فیلد غیررشته‌ای (تزریق آبجکت) رد می‌شه و کرش نمی‌کنه", () => {
  const order = validOrder();
  order.customer.name = { $gt: "" };

  assert.deepEqual(validateOrder(order).errors, ["نام نامعتبر است"]);
});

test("آدرس خیلی طولانی رد می‌شه", () => {
  const order = validOrder();
  order.customer.address = "x".repeat(1001);

  assert.equal(validateOrder(order).valid, false);
});

test("تعداد اعشاری، صفر یا بیش از سقف رد می‌شه", () => {
  [0, 1.5, 10001, "abc"].forEach((quantity) => {
    const order = validOrder();
    order.items[0].quantity = quantity;

    assert.equal(validateOrder(order).valid, false, `quantity=${quantity}`);
  });
});

test("بیش از ۱۰۰ ردیف رد می‌شه", () => {
  const order = validOrder();
  order.items = Array.from({ length: 101 }, () => ({ productId: "x", quantity: 1 }));

  assert.equal(validateOrder(order).valid, false);
});

test("بدنه‌ی خالی کرش نمی‌کنه", () => {
  assert.equal(validateOrder(undefined).valid, false);
  assert.equal(validateOrder({}).valid, false);
});

test("موقعیت نقشه‌ی نامعتبر رد می‌شه", () => {
  const order = validOrder();
  order.customer.location = { lat: 200, lng: 51 };

  assert.equal(validateOrder(order).valid, false);
});
