// هندسه‌ی چرخ‌وفلک لوگوها: بیضی سه‌بعدی دور تصویر وسط کارت (ماشین «خودروهای من»
// یا قطره‌ی «روانکار»)؛ بالای بیضی = پشت تصویر و کوچیک‌تر، پایینش = جلو و بزرگ‌تر

export const START_ANGLE = -Math.PI / 2;

// بدنه‌ی ماشین CarArt نسبت به کادر SVG (viewBox 160×80: x از ۱۴ تا ۱۴۵، y از ۱۴ تا ته چرخ‌ها ۷۳)
const BODY = { cx: 0.497, cy: 0.544, halfW: 0.41, halfH: 0.37 };

// نیم‌قطر لوگو (۲۱px وقتی جلوست) + چند پیکسل فاصله تا بدنه
const CHIP_CLEARANCE = 22;

// اندازه‌ی باکس تصویر (art) و کادر SVG داخلش (ماشین یا قطره)؛ هر فریم یک بار خونده می‌شه، نه برای تک‌تک لوگوها،
// تا خوندن اندازه بین نوشتن transformها هر بار layout اجباری راه نندازه
export function artSize(art) {
  const car = art.querySelector("svg")?.getBoundingClientRect();
  const box = art.getBoundingClientRect();

  return {
    w: art.clientWidth,
    h: art.clientHeight,
    car: car && { x: car.left - box.left, y: car.top - box.top, w: car.width, h: car.height },
  };
}

// بیضی مدار دور بدنه‌ی ماشین: مستطیل بدنه + فاصله‌ی لوگو کامل داخل بیضی می‌افته، پس لوگوها
// هیچ‌جای مسیر روی چرخ‌ها و بدنه نمی‌رن. اگه عرض کارت کم باشه rx کوچیک‌تر و ry بلندتر می‌شه
// (هنوز دور مستطیل)؛ اندازه‌ی ماشین با عرض کارت کم می‌شه (CarArt) تا این حالت پیش نیاد.
export function carEllipse({ w, h, car }) {
  if (!car) return { cx: w / 2, cy: h / 2 + 4, rx: Math.min(w / 2 - 26, 175), ry: 66 };

  const hw = car.w * BODY.halfW + CHIP_CLEARANCE;
  const hh = car.h * BODY.halfH + CHIP_CLEARANCE;
  const rx = Math.min(hw * Math.SQRT2, w / 2 - 20);
  const ry = rx > hw ? hh / Math.sqrt(1 - (hw / rx) ** 2) : hh * Math.SQRT2;

  // کارت افقی موبایل (باکس تصویر باریک): بیضی از قد باکس بیرون نمی‌زنه؛ لوگوهای جلو روی
  // گوشه‌ی ماشین و پشتی‌ها زیرش رد می‌شن (z-index در applySlot)
  return { cx: car.x + car.w * BODY.cx, cy: car.y + car.h * BODY.cy, rx, ry: Math.min(ry, h / 2 - 2) };
}

// قد CarArt بر اساس عرض باکس تصویر (همون پله‌های @min-[…] در className اون؛ viewBox 2:1)
function carArtHeight(w) {
  if (w >= 322) return 96;
  if (w >= 286) return 80;
  if (w >= 248) return 64;
  return 48;
}

// کارت «روانکار»: مدار دقیقاً هم‌شکل کارت «خودروهای من» — بیضی carEllipse برای ماشینی فرضی
// به همون اندازه و جای ماشین وسط باکس (از sm باکس تصویر دو کارت هم‌اندازه‌ست؛ روی موبایل
// باکس «روانکار» تمام‌عرضه و ماشین فرضی همون اندازه‌ای که CarArt در این عرض می‌گرفت)
export function dropEllipse({ w, h }) {
  const ch = carArtHeight(w);
  const cw = ch * 2;

  return carEllipse({ w, h, car: { x: (w - cw) / 2, y: (h - ch) / 2, w: cw, h: ch } });
}

// جای لوگوی i از n روی بیضی، به مختصات باکس تصویر (size از artSize)
export function orbitSlot(size, i, n, angle, ellipse = carEllipse) {
  const { cx, cy, rx, ry } = ellipse(size);

  const a = angle + (i * 2 * Math.PI) / n;
  const depth = Math.sin(a); // ۱ = جلو، ۱- = پشت

  return {
    x: cx + rx * Math.cos(a),
    y: cy + ry * Math.sin(a),
    scale: 0.72 + (0.28 * (depth + 1)) / 2,
    opacity: 0.55 + (0.45 * (depth + 1)) / 2,
    front: depth > 0.15,
  };
}

export function applySlot(chip, slot) {
  chip.style.transform = `translate(${slot.x}px, ${slot.y}px) scale(${slot.scale})`;
  chip.style.opacity = slot.opacity;
  chip.style.zIndex = slot.front ? 3 : 1;
}

// نقطه‌ی شروع تصادفی دور تا دور لبه‌های صفحه
export function edgePoint(i) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const pad = 60;
  const t = Math.random();

  switch (i % 4) {
    case 0: return { x: t * W, y: -pad };
    case 1: return { x: W + pad, y: t * H };
    case 2: return { x: t * W, y: H + pad };
    default: return { x: -pad, y: t * H };
  }
}

// پرواز از لبه‌ی صفحه تا جای لوگو روی بیضی، با مسیر منحنی و چرخش
export function flightKeyframes(from, to, slot) {
  // نقطه‌ی وسط کمی از خط مستقیم کنار می‌ره تا مسیر منحنی بشه
  const mx = (from.x + to.x) / 2 + (to.y - from.y) * 0.25;
  const my = (from.y + to.y) / 2 - (to.x - from.x) * 0.25;
  const turn = (Math.random() < 0.5 ? -1 : 1) * 360;

  return [
    { transform: `translate(${from.x}px, ${from.y}px) rotate(${turn}deg) scale(.5)`, opacity: 0 },
    { transform: `translate(${mx}px, ${my}px) rotate(${turn / 3}deg) scale(1.25)`, opacity: 1, offset: 0.55 },
    { transform: `translate(${to.x}px, ${to.y}px) rotate(0deg) scale(${slot.scale * 1.15})`, opacity: 1, offset: 0.88 },
    { transform: `translate(${to.x}px, ${to.y}px) rotate(0deg) scale(${slot.scale})`, opacity: slot.opacity },
  ];
}

export function makeChip(brand) {
  const chip = document.createElement("div");
  chip.className = "logo-chip";
  chip.setAttribute("aria-hidden", "true");

  const img = document.createElement("img");
  img.src = brand.logo;
  img.alt = "";
  img.draggable = false;
  chip.appendChild(img);

  return chip;
}
