const brands = require("../data/brands");
const { toNumber } = require("./excelReader");

// برند اکسل (فارسی یا انگلیسی) ← نام فارسی ثبت‌شده‌ی برند؛ برند ناشناخته خطا می‌ده
function normalizeBrand(rawBrand) {
  const value = String(rawBrand || "").trim();

  const match = brands.find(
    (b) =>
      b.name === value || b.nameEn.toLowerCase() === value.toLowerCase(),
  );

  if (!match) {
    throw new Error(
      `برند «${value}» شناخته‌شده نیست. یکی از برندهای موجود را وارد کنید: ${brands
        .map((b) => b.name)
        .join("، ")}`,
    );
  }

  return match.name;
}

// بعضی فایل‌ها (مثلاً ادینول) توی ستون ویسکوزیته، بعد از گرید لیست بلند
// تاییدیه‌های خودروسازها رو هم آوردن و کارت محصول به‌هم می‌ریزه. گرید واقعی
// نگه داشته می‌شه و بقیه به توضیحات منتقل می‌شه.
const MAX_GRADE_LENGTH = 30;
const GRADE_PATTERN = /^(ISO\s*VG\s*\d+|(SAE\s*)?\d{1,2}W-?\d{2,3}|SAE\s*\d{2,3})/i;

function splitGrade(rawGrade) {
  const value = String(rawGrade || "").trim();

  if (value.length <= MAX_GRADE_LENGTH) return { grade: value, approvals: "" };

  const match = value.match(GRADE_PATTERN);
  const grade = match ? match[0].trim() : "";
  const approvals = value.slice(grade.length).replace(/^[\s,;:-]+/, "");

  return { grade, approvals };
}

function toBoolean(value) {
  return ["بله", "yes", "true", "1"].includes(String(value).trim().toLowerCase());
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// یک ردیف اکسل ← سند محصول (بدون عکس). ردیف ناقص یا برند ناشناخته خطا می‌ده.
function rowToProductDoc(row) {
  if (!row.sku) throw new Error("کد محصول (sku) خالی است");
  if (!row.name) throw new Error("نام محصول خالی است");
  if (!row.brand) throw new Error("برند خالی است");

  const { grade, approvals } = splitGrade(row.viscosity);

  const doc = {
    sku: row.sku,
    name: row.name,
    brand: normalizeBrand(row.brand),
    category: row.category || "",
    volume: row.volume || "",
    viscosity: grade,
    api: row.api || "",
    acea: row.acea || "",
    oilType: row.oilType || "",
    description: [row.description, approvals && `تاییدیه‌ها: ${approvals}`]
      .filter(Boolean)
      .join("\n\n"),
    price: toNumber(row.price) || 0,
    cartonCount: toNumber(row.cartonCount) || 1,
    stock: toNumber(row.stock) || 0,
    supplier: row.supplier || "",
    warranty: row.warranty || "",
    tags: splitList(row.tags),
    isBestSeller: toBoolean(row.isBestSeller),
  };

  const priceCheck = toNumber(row.priceCheck);

  if (!isNaN(priceCheck)) {
    doc.priceCheck = priceCheck;
  }

  return doc;
}

module.exports = { rowToProductDoc, splitList, splitGrade, normalizeBrand };
