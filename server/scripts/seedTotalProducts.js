require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { isEnabled, uploadLocalFile } = require("../utils/cloudStorage");

// لیست قیمت توتال (امارات + فرانسه) — مهر ۱۴۰۵؛ قیمت به تومان (لیست ریالی ÷ ۱۰)
// محصولی که عکس رسمی نداره (فایلش در assets/total نیست) بی‌عکس ثبت می‌شه
// و سایت به‌جاش لوگوی توتال رو نشون می‌ده.
const PCMO = "روغن موتور خودرو سواری (PCMO)";

const NEW_PRODUCTS = [
  {
    sku: "TE-QTZ-9000-MVP-0530-4L",
    name: "روغن موتور کوارتز 9000 MVP",
    category: PCMO,
    volume: "۴ لیتری (پلاستیکی)",
    viscosity: "5W-30",
    api: "SP",
    oilType: "تمام سنتتیک",
    price: 15000000,
    cartonCount: 3,
    description: "TotalEnergies QUARTZ 9000 MVP 5W-30 SP (امارات)",
  },
  {
    sku: "TE-QTZ-9000-MVP-0530-1L",
    name: "روغن موتور کوارتز 9000 MVP",
    category: PCMO,
    volume: "۱ لیتری (پلاستیکی)",
    viscosity: "5W-30",
    api: "SP",
    oilType: "تمام سنتتیک",
    price: 4000000,
    cartonCount: 12,
    description: "TotalEnergies QUARTZ 9000 MVP 5W-30 SP (امارات)",
  },
  {
    sku: "TE-QTZ-9000-0540-1L",
    name: "روغن موتور کوارتز 9000 انرژی",
    category: PCMO,
    volume: "۱ لیتری (پلاستیکی)",
    viscosity: "5W-40",
    api: "SN",
    oilType: "تمام سنتتیک",
    price: 3860000,
    cartonCount: 12,
    description: "TotalEnergies QUARTZ 9000 ENERGY 5W-40 SN (امارات)",
  },
  {
    sku: "TE-QTZ-7000-1040-EU-4L",
    name: "روغن موتور کوارتز 7000 اروپا",
    category: PCMO,
    volume: "۴ لیتری (پلاستیکی)",
    viscosity: "10W-40",
    api: "SN",
    oilType: "تمام سنتتیک",
    price: 11900000,
    cartonCount: 4,
    description: "TotalEnergies QUARTZ 7000 10W-40 SN — تولید اروپا، فول سنتتیک",
  },
  {
    sku: "TE-QTZ-7000-1040-4L-METAL",
    name: "روغن موتور کوارتز 7000",
    category: PCMO,
    volume: "۴ لیتری (فلزی)",
    viscosity: "10W-40",
    api: "SN",
    oilType: "نیمه سنتتیک",
    price: 10670000,
    cartonCount: 6,
    description: "TotalEnergies QUARTZ 7000 10W-40 SN (امارات، نیمه سنتتیک)",
  },
  {
    sku: "TE-QTZ-7000-1040-1L",
    name: "روغن موتور کوارتز 7000",
    category: PCMO,
    volume: "۱ لیتری (پلاستیکی)",
    viscosity: "10W-40",
    api: "SN",
    oilType: "نیمه سنتتیک",
    price: 1937000,
    cartonCount: 12,
    description: "TotalEnergies QUARTZ 7000 10W-40 SN (امارات)",
  },
  {
    sku: "TE-QTZ-5000-2050-1L",
    name: "روغن موتور کوارتز 5000",
    category: PCMO,
    volume: "۱ لیتری (پلاستیکی)",
    viscosity: "20W-50",
    api: "SL",
    oilType: "معدنی",
    price: 1450000,
    cartonCount: 12,
    description: "TotalEnergies QUARTZ 5000 SL 20W-50 (امارات)",
  },
  {
    sku: "TE-FLM-DVI-MV-1L",
    name: "روغن دنده اتوماتیک DVI MV",
    category: "روغن دنده اتومات",
    volume: "۱ لیتری",
    price: 5650000,
    cartonCount: 12,
    description: "TotalEnergies FLUIDMATIC DVI MV — ATF VI (Dexron VI) چندمنظوره",
  },
  {
    sku: "TE-FLM-LV-MV-1L",
    name: "روغن دنده اتوماتیک LV MV",
    category: "روغن دنده اتومات",
    volume: "۱ لیتری",
    price: 4580000,
    cartonCount: 12,
    description: "TotalEnergies FLUIDMATIC LV MV — MVLV، روغن گیربکس اتوماتیک کم‌گرانروی چندمنظوره",
  },
  {
    sku: "TE-INJ-CLEANER-250",
    name: "انژکتورشوی",
    category: "محصولات مراقبتی موتور",
    volume: "۲۵۰ میلی‌لیتر",
    price: 1550000,
    cartonCount: 24,
    description: "انژکتورشوی توتال (TotalEnergies Injector Cleaner)",
  },
  {
    sku: "TE-ENG-FLUSH-250",
    name: "موتورشوی",
    category: "مکمل روغن موتور",
    volume: "۲۵۰ میلی‌لیتر",
    price: 1820000,
    cartonCount: 24,
    description: "موتورشوی توتال (TotalEnergies Engine Flush)",
  },
  {
    sku: "TE-LHM-PLUS-1L",
    name: "روغن هیدرولیک LHM پلاس",
    category: "روغن هیدرولیک",
    volume: "۱ لیتری",
    price: 4050000,
    cartonCount: 12,
    description: "TotalEnergies LHM PLUS — روغن هیدرولیک",
  },
  {
    sku: "TE-MULTIS-EP3-1KG",
    name: "گریس لیتیوم Multis EP3",
    category: "گریس",
    volume: "۱ کیلوگرمی",
    price: 4380000,
    cartonCount: 12,
    description: "TotalEnergies MULTIS EP 3 — گریس لیتیوم",
  },
  {
    sku: "TE-MULTIFUNCTION-SPRAY-250",
    name: "اسپری روان‌کننده چندمنظوره",
    category: "اسپری روان‌کننده",
    volume: "۲۵۰ میلی‌لیتر",
    price: 1500000,
    cartonCount: 12,
    description: "TotalEnergies Multifunction Fluid — اسپری روان‌کننده",
  },
  {
    sku: "TE-ELF-NFX-75W-1L",
    name: "روغن دنده ترانسلف NFX",
    category: "روغن دنده",
    volume: "۱ لیتری",
    viscosity: "75W",
    api: "GL-4",
    price: 6870000,
    cartonCount: 12,
    description: "ELF TRANSELF NFX SAE 75W (فرانسه)",
  },
];

// محصولات موجود: فقط اسم (برای جدا شدن کارت‌ها از هم)، API و نوع روغن؛
// قیمت، عکس و لینک خودروها دست نمی‌خورن.
const EXISTING_UPDATES = [
  { sku: "TE-QTZ-018", name: "روغن موتور کوارتز 9000 انرژی MVP", api: "SN", oilType: "تمام سنتتیک" },
  { sku: "TE-QTZ-019", name: "روغن موتور کوارتز 9000 انرژی", api: "SN", oilType: "تمام سنتتیک" },
  { sku: "TE-QTZ-012", name: "روغن موتور کوارتز 7000", api: "SN", oilType: "نیمه سنتتیک" },
  { sku: "TE-QTZ-008", name: "روغن موتور کوارتز 5000", api: "SL", oilType: "معدنی" },
  { sku: "TE-QTZ-006", name: "روغن موتور Motor Oil", api: "SF", oilType: "معدنی" },
  { sku: "TE-ELF-008", name: "روغن موتور الف Evolution 400", api: "SL", oilType: "معدنی" },
];

const APPLY = process.argv.includes("--apply");

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ NEW_PRODUCTS, EXISTING_UPDATES }));
  process.exit(0);
}

const imageFile = (sku) => path.join(__dirname, "assets", "total", `${sku}.jpg`);

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const rows = [];

  for (const item of NEW_PRODUCTS) {
    const existing = await Product.findOne({ sku: item.sku }).lean();
    const file = imageFile(item.sku);
    const hasImage = fs.existsSync(file);

    rows.push({
      sku: item.sku,
      status: existing ? "update" : "create",
      price: item.price.toLocaleString(),
      image: hasImage ? "photo" : "logo",
    });

    if (!APPLY) continue;

    let image = existing?.image;

    if (!image?.main) {
      const main = hasImage && isEnabled()
        ? await uploadLocalFile(file, { keepLocal: true })
        : "";
      image = { main, gallery: [] };
    }

    await Product.updateOne(
      { sku: item.sku },
      {
        $set: {
          viscosity: "",
          api: "",
          oilType: "",
          ...item,
          brand: "توتال",
          priceCheck: item.price,
          isActive: true,
          image,
        },
      },
      { upsert: true },
    );
  }

  for (const { sku, ...fields } of EXISTING_UPDATES) {
    const result = APPLY
      ? await Product.updateOne({ sku }, { $set: fields })
      : { matchedCount: await Product.countDocuments({ sku }) };

    rows.push({ sku, status: result.matchedCount ? "update" : "missing", price: "-", image: "-" });
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
