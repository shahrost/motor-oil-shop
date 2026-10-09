const brands = require("../data/brands");
const RowError = require("./RowError");

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

// متن برای مقایسه: ی/ک عربی، نیم‌فاصله و فاصله‌ی اضافه، ارقام فارسی/عربی، حروف بزرگ و کوچک
function normalizeText(value) {
  return String(value || "")
    .replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS.indexOf(d))
    .replace(/[٠-٩]/g, (d) => ARABIC_DIGITS.indexOf(d))
    .replace(/ك/g, "ک")
    .replace(/[يى]/g, "ی")
    .replace(/[‌‍_\-.,،/\()]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const tokensOf = (value) => normalizeText(value).split(" ").filter(Boolean);

// ترتیب کلمات مهم نیست: «میهن فیلتر» = «فیلتر میهن»
const orderFreeKey = (value) => tokensOf(value).sort().join(" ");

// فاصله‌ی ویرایشی ساده برای پیشنهاد نزدیک‌ترین برند
function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);

  for (let j = 1; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }

  return dp[a.length][b.length];
}

// همه‌ی نام‌هایی که یک برند با آن‌ها شناخته می‌شود
const namesOf = (brand) => [brand.name, brand.nameEn, ...(brand.aliases || [])].filter(Boolean);

// شباهت ۰ تا ۱ بین نام اکسل و بهترین نام یک برند (هم‌پوشانی کلمات + شباهت نوشتاری)
function similarity(raw, brand) {
  const rawTokens = tokensOf(raw);
  const rawKey = orderFreeKey(raw);

  return Math.max(
    ...namesOf(brand).map((name) => {
      const tokens = tokensOf(name);
      const common = rawTokens.filter((t) => tokens.includes(t)).length;
      const overlap = common / Math.max(rawTokens.length, tokens.length);
      const key = orderFreeKey(name);
      const spelling = 1 - editDistance(rawKey, key) / Math.max(rawKey.length, key.length, 1);

      return Math.max(overlap, spelling);
    }),
  );
}

const SUGGEST_THRESHOLD = 0.5;

function findClosestBrand(raw) {
  const ranked = brands
    .map((brand) => ({ brand, score: similarity(raw, brand) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0] && ranked[0].score >= SUGGEST_THRESHOLD ? ranked[0].brand : null;
}

// قالب «نام فارسی (نام انگلیسی)» مثل «لوکومبیل (LocoMobil)»: هر بخش جدا تطبیق داده می‌شه
function partsOf(value) {
  const match = value.match(/^(.+?)\s*\((.+)\)\s*$/);

  return match ? [value, match[1], match[2]] : [value];
}

// برند اکسل ← برند ثبت‌شده. سطح‌های تطبیق: مساوی بعد از نرمال‌سازی، سپس مساوی بدون توجه
// به ترتیب کلمات. اگه چند برند هم‌زمان جور شدن حدس نمی‌زنیم و خطای واضح می‌دیم.
function matchBrand(rawBrand) {
  const value = String(rawBrand || "").trim();
  const parts = partsOf(value);
  const exactKeys = parts.map(normalizeText);
  const looseKeys = parts.map(orderFreeKey);

  const levels = [
    (name) => exactKeys.includes(normalizeText(name)),
    (name) => looseKeys.includes(orderFreeKey(name)),
  ];

  for (const isSame of levels) {
    const matches = brands.filter((brand) => namesOf(brand).some(isSame));

    if (matches.length === 1) return matches[0];

    if (matches.length > 1) {
      throw new RowError(
        `برند «${value}» با چند برند جور است (${matches.map((b) => b.name).join("، ")}). نام دقیق برند را وارد کنید`,
        `برند «${value}» با چند برند جور است`,
      );
    }
  }

  const closest = findClosestBrand(value);
  const suggestion = closest ? `. نزدیک‌ترین برند: «${closest.name}»` : "";

  throw new RowError(
    `برند «${value}» شناخته‌شده نیست${suggestion}`,
    `برند «${value}» شناخته‌شده نیست${suggestion}`,
    closest ? undefined : `برندهای موجود: ${brands.map((b) => b.name).join("، ")}`,
  );
}

module.exports = { matchBrand, normalizeText, findClosestBrand };
