require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// طرح‌های فروش ثابت — شهریور ۱۴۰۵
const PROMOTIONS = {
  // ضد یخ سمن شیمی (کارتنی: ۱، ۲ و ۴ کیلویی): هر ۴ کارتن ۱ کارتن هدیه (نقدی و چکی یکسان)
  "SC-AF-001": { isActive: true, buyQty: 4, giftQtyCash: 1, giftQtyCheck: 1 },
  "SC-AF-001-2KG": { isActive: true, buyQty: 4, giftQtyCash: 1, giftQtyCheck: 1 },
  "SC-AF-001-4KG": { isActive: true, buyQty: 4, giftQtyCash: 1, giftQtyCheck: 1 },

  // روغن ترمز سمن شیمی (DOT3 و DOT4): هر ۱ کارتن — نقدی ۱۰ عدد هدیه، چکی/اعتباری ۸ عدد هدیه
  "SC-BRK-001": { isActive: true, buyQty: 1, giftQtyCash: 10, giftQtyCheck: 8 },
  "SC-BRK-002": { isActive: true, buyQty: 1, giftQtyCash: 10, giftQtyCheck: 8 },

  // وم اویل: هر ۱۰ کارتن ۱ کارتن هدیه (فرقی بین نقدی و چکی نیست)
  "WOM-PET-001": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-002": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-003": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-008": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-009": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-010": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-PET-011": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-MOTO-001": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-MOTO-002": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-MOTO-003": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-GEAR-001": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-GEAR-002": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-GEAR-003": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-ATF-001": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-ATF-002": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-ATF-004": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
  "WOM-ATF-005": { isActive: true, buyQty: 10, giftQtyCash: 1, giftQtyCheck: 1 },
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
