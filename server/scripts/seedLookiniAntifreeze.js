require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

// جشنواره فروش ضد یخ لوکینی — مهر ۱۴۰۵ (قیمت پایه به تومان)
// نقدی: هر ۳ کارتن ۱ کارتن هدیه — اعتباری: هر ۴ کارتن ۱ کارتن هدیه
const festival = (minQty = 0) => ({
  isActive: true,
  buyQty: 3,
  buyQtyCash: 3,
  buyQtyCheck: 4,
  giftQtyCash: 1,
  giftQtyCheck: 1,
  minQty,
  note: "جشنواره فروش ضد یخ لوکینی",
});

const PRODUCTS = [
  {
    sku: "LK-AF-1KG",
    name: "ضدیخ",
    category: "ضد یخ",
    volume: "۱ کیلوگرمی",
    price: 490000,
    cartonCount: 12,
    description: "ضد یخ لوکینی",
    promotion: festival(60),
  },
  {
    sku: "LK-AF-2.5KG",
    name: "ضدیخ",
    category: "ضد یخ",
    volume: "۲.۵ کیلوگرمی",
    price: 1199000,
    cartonCount: 6,
    description: "ضد یخ لوکینی",
    promotion: festival(),
  },
  {
    sku: "LK-AF-4KG",
    name: "ضدیخ",
    category: "ضد یخ",
    volume: "۴ کیلوگرمی",
    price: 1831000,
    cartonCount: 6,
    description: "ضد یخ لوکینی",
    promotion: festival(),
  },
  {
    sku: "LK-COOL-RED-1KG",
    name: "کولانت قرمز",
    category: "کولانت",
    volume: "۱ کیلوگرمی",
    price: 543000,
    cartonCount: 12,
    description: "کولانت قرمز لوکینی (Long Life Coolant)",
    promotion: festival(),
  },
];

const APPLY = process.argv.includes("--apply");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];

  for (const item of PRODUCTS) {
    const existing = await Product.findOne({ sku: item.sku }).lean();

    rows.push({
      sku: item.sku,
      status: existing ? "update" : "create",
      price: item.price.toLocaleString(),
      carton: item.cartonCount,
      minQty: item.promotion.minQty || "-",
    });

    if (!APPLY) continue;

    let image = existing?.image;

    if (!image?.main) {
      const file = path.join(__dirname, "assets", "lookini", `${item.sku}.png`);
      const main = isEnabled()
        ? await uploadLocalFile(file, { keepLocal: true })
        : "";
      image = { main, gallery: [] };
    }

    await Product.updateOne(
      { sku: item.sku },
      {
        $set: {
          ...item,
          brand: "لوکینی",
          priceCheck: item.price,
          isActive: true,
          image,
        },
      },
      { upsert: true },
    );
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
