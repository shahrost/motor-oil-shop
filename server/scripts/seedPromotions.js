require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// طرح‌های فروش ثابت — شهریور ۱۴۰۵
const PROMOTIONS = {
  // ضد یخ سمن شیمی (۱، ۲ و ۴ کیلویی): نقدی ۴+۱، چکی ۶+۱ — تأیید مالک ۲۰۲۶/۱۱/۲۱
  "SC-AF-001": { isActive: true, buyQty: 4, buyQtyCash: 4, buyQtyCheck: 6, giftQtyCash: 1, giftQtyCheck: 1 },
  "SC-AF-001-2KG": { isActive: true, buyQty: 4, buyQtyCash: 4, buyQtyCheck: 6, giftQtyCash: 1, giftQtyCheck: 1 },
  "SC-AF-001-4KG": { isActive: true, buyQty: 4, buyQtyCash: 4, buyQtyCheck: 6, giftQtyCash: 1, giftQtyCheck: 1 },

  // روغن ترمز سمن شیمی (آبی SC-BRK-002 و زرد SC-BRK-001): نقدی ۳+۱، چکی ۴+۱ — طرح مالک ۲۰۲۶/۱۱/۲۲
  "SC-BRK-001": { isActive: true, buyQty: 3, buyQtyCash: 3, buyQtyCheck: 4, giftQtyCash: 1, giftQtyCheck: 1 },
  "SC-BRK-002": { isActive: true, buyQty: 3, buyQtyCash: 3, buyQtyCheck: 4, giftQtyCash: 1, giftQtyCheck: 1 },

  // طرح‌های وم اویل و ایدلوب از supplierPromotion در لیست و سفارش اعمال می‌شوند.

};

const APPLY = process.argv.includes("--apply");
// --only=SC-AF  → فقط SKUهایی که با این پیشوند شروع می‌شوند
const ONLY = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];

  for (const [sku, promotion] of Object.entries(PROMOTIONS)) {
    if (ONLY && !sku.startsWith(ONLY)) continue;

    const p = await Product.findOne({ sku }).lean();

    if (!p) {
      rows.push({ sku, name: "NOT FOUND", rule: "-" });
      continue;
    }

    rows.push({
      sku,
      name: p.name,
      rule:
        `نقدی: هر ${promotion.buyQtyCash || promotion.buyQty} کارتن ${promotion.giftQtyCash} هدیه — ` +
        `چکی: هر ${promotion.buyQtyCheck || promotion.buyQty} کارتن ${promotion.giftQtyCheck} هدیه` +
        (promotion.minQty ? ` — حداقل ${promotion.minQty}` : ""),
    });

    if (APPLY) {
      await Product.updateOne({ sku }, { $set: { promotion } });
    }
  }

  console.table(rows);
  console.log(
    APPLY
      ? "\n✅ در دیتابیس اعمال شد"
      : "\n(اجرای آزمایشی — برای ثبت، --apply را اضافه کنید)",
  );

  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
