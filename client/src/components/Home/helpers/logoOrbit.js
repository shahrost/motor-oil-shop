// هندسه‌ی چرخ‌وفلک لوگوها در کارت «خودروهای من»: بیضی سه‌بعدی دور ماشین
// (بالای بیضی = پشت ماشین و کوچیک‌تر، پایینش = جلوی ماشین و بزرگ‌تر)

export const START_ANGLE = -Math.PI / 2;

// جای لوگوی i از n روی بیضی، به مختصات باکس تصویر (art)
export function orbitSlot(art, i, n, angle) {
  const w = art.clientWidth;
  const h = art.clientHeight;
  const cx = w / 2;
  const cy = h / 2 + 4;
  const rx = Math.min(w / 2 - 26, 175);
  const ry = 66;

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

  const img = document.createElement("img");
  img.src = brand.logo;
  img.alt = "";
  img.draggable = false;
  chip.appendChild(img);

  return chip;
}
