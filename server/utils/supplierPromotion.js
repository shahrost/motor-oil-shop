// شرایط فروش ارسالی ۱۴۰۵/۰۸/۲۱؛ طبق تأیید صاحب فروشگاه، نقدی و اعتباری یکسان‌اند.
// یک منبع برای لیست محصولات و محاسبه سفارش؛ طرح قدیمی ۱۰+۱ وم اویل جایگزین می‌شود.
const normalize = (value) => String(value || "")
  .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
  .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
  .replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[‌\s]/g, "").toLowerCase();

function volumeInLitres(value) {
  const text = normalize(value).replace(/[٫/]/g, ".");
  const amount = Number.parseFloat(text);
  return /cc|ml|سیسی|میلی/.test(text) ? amount / 1000 : amount;
}

function getSupplierPromotion(product) {
  const brand = normalize(product.brand);
  const aidlube = ["ایدلوب", "aidlube", "idlube"].includes(brand);
  const wom = ["وماویل", "womoil", "wom"].includes(brand);
  if (!aidlube && !wom) return null;

  const sku = String(product.sku || "").toUpperCase();
  const type = normalize(`${product.category || ""} ${product.name || ""}`);
  const motorcycle = (/روغن/.test(type) && /موتورسیکلت|دوزمانه/.test(type)) || /^WOM-(MOTO|2T)-|^AL-MOTO-/.test(sku);
  const engine = /روغنموتور/.test(type) || /^AL-ENG-|^WOM-PET-/.test(sku);
  const gearbox = /گیربکس|روغندنده/.test(type) || /^AL-GBX-/.test(sku);
  const automatic = /اتومات|\batf\b/.test(type) || /^WOM-ATF-/.test(sku);
  const viscosity = normalize(product.viscosity);
  let buyQty = 0;
  if (aidlube && (engine || motorcycle || gearbox)) buyQty = 8;
  if (wom) {
    if (motorcycle) buyQty = 6;
    else if (automatic || (engine && viscosity.replace(/-/g, "") === "20w50")) buyQty = 5;
    else if (engine && ["10w40", "5w40", "5w30", "0w20"].includes(viscosity.replace(/-/g, ""))) buyQty = 6;
  }

  if (!buyQty) return { isActive: false };
  const litres = volumeInLitres(product.volume);
  let belowThresholdRulesCheck = [];
  if (aidlube) {
    if (litres === 1) belowThresholdRulesCheck = [{ buyQty: 4, giftQty: 6 }, { buyQty: 1, giftQty: 1 }];
    if ([4, 5].includes(litres)) belowThresholdRulesCheck = [{ buyQty: 2, giftQty: 1 }];
  } else {
    if (litres === 1) belowThresholdRulesCheck = [{ buyQty: 1, giftQty: 2 }];
    if ([3.5, 4].includes(litres)) belowThresholdRulesCheck = [{ buyQty: 1, giftQty: 1 }];
    if ((buyQty === 5 && litres === 4.5) || (buyQty === 6 && litres === 5)) {
      belowThresholdRulesCheck = [{ buyQty: 3, giftQty: 2 }];
    }
  }
  return {
    isActive: true,
    supplierPlan: aidlube ? "aidlube-1405-08" : "wom-oil-1405-08",
    buyQtyCash: buyQty,
    buyQtyCheck: buyQty,
    giftQtyCash: 1,
    giftQtyCheck: 1,
    belowThresholdRulesCash: belowThresholdRulesCheck,
    belowThresholdRulesCheck,
    note: "برای خرید نقدی و اعتباری ۱، ۲ و ۳ ماهه؛ هدیه از همین محصول است. هدیه عددی فقط برای خرید زیر حدنصاب کارتنی محاسبه می‌شود.",
  };
}

function applySupplierPromotion(product) {
  const data = typeof product.toJSON === "function" ? product.toJSON() : product;
  const promotion = getSupplierPromotion(data);
  return promotion ? { ...data, promotion } : product;
}

module.exports = { getSupplierPromotion, applySupplierPromotion };
