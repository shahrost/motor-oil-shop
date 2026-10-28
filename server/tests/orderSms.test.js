const test = require("node:test");
const assert = require("node:assert/strict");

const buildOrderSmsMessage = require("../utils/orderSmsMessage");
const { sendSms } = require("../services/smsService");
const { notifyNewOrder } = require("../services/orderNotificationService");

const order = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  customer: { name: "علی رضایی", phone: "09121234567", area: "پرند" },
  items: [{ paymentType: "cash" }, { paymentType: "check" }],
  totalPrice: 1250000,
};

function withEnv(env, fn) {
  const saved = { ...process.env };
  Object.assign(process.env, env);
  return Promise.resolve(fn()).finally(() => {
    process.env = saved;
  });
}

test("متن پیامک: شماره، مشتری، منطقه، اقلام و مبلغ", () => {
  const message = buildOrderSmsMessage(order);

  assert.match(message, /سفارش جدید #3fa85f64/);
  assert.match(message, /علی رضایی - 09121234567/);
  assert.match(message, /منطقه: پرند/);
  assert.match(message, /۲ قلم، نقدی و چکی/);
  assert.match(message, /مبلغ: ۱٬۲۵۰٬۰۰۰ تومان/);
});

test("ارسال کاوه‌نگار: آدرس، گیرنده و خط", async () => {
  const realFetch = global.fetch;
  let call;
  global.fetch = async (url, options) => {
    call = { url, body: options.body };
    return { status: 200, json: async () => ({ return: { status: 200 } }) };
  };

  try {
    await withEnv({ KAVENEGAR_API_KEY: "TESTKEY", KAVENEGAR_SENDER: "10004346" }, async () => {
      assert.equal(await sendSms(["09121234567"], "سلام"), true);
    });

    assert.equal(call.url, "https://api.kavenegar.com/v1/TESTKEY/sms/send.json");
    assert.equal(call.body.get("receptor"), "09121234567");
    assert.equal(call.body.get("sender"), "10004346");
  } finally {
    global.fetch = realFetch;
  }
});

test("خطای کاوه‌نگار throw می‌شه", async () => {
  const realFetch = global.fetch;
  global.fetch = async () => ({
    status: 200,
    json: async () => ({ return: { status: 418, message: "اعتبار کافی نیست" } }),
  });

  try {
    await withEnv({ KAVENEGAR_API_KEY: "TESTKEY" }, async () => {
      await assert.rejects(sendSms(["09121234567"], "x"), /418/);
    });
  } finally {
    global.fetch = realFetch;
  }
});

test("خطای پیامک ثبت سفارش رو خراب نمی‌کنه و بدون تنظیمات چیزی فرستاده نمی‌شه", async () => {
  const realFetch = global.fetch;
  const realError = console.error;
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    throw new Error("network down");
  };
  console.error = () => {};

  try {
    await withEnv({ KAVENEGAR_API_KEY: "", ORDER_SMS_RECEPTORS: "09121234567" }, () => {
      notifyNewOrder(order);
    });
    assert.equal(calls, 0);

    await withEnv({ KAVENEGAR_API_KEY: "K", ORDER_SMS_RECEPTORS: "09121234567, bad" }, async () => {
      assert.doesNotThrow(() => notifyNewOrder(order));
      await new Promise((resolve) => setImmediate(resolve));
    });
    assert.equal(calls, 1);
  } finally {
    global.fetch = realFetch;
    console.error = realError;
  }
});
