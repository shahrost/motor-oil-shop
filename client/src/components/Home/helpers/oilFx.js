// ابزارهای انیمیشن روغن کارت «روانکار»: ساخت قطره و پاشش، پخش رنگ روی متن،
// و هندسه‌ی گالن. همه‌ی المان‌های موقت داخل لایه‌ی انیمیشن کارت ساخته می‌شن.

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function play(el, keyframes, options) {
  try {
    await el.animate(keyframes, { fill: "forwards", ...options }).finished;
  } catch {
    // انیمیشن با unmount یا اجرای دوباره لغو شد
  }
}

function spawn(layer, className, styles) {
  const el = document.createElement("div");
  el.className = className;
  Object.assign(el.style, styles);
  layer.appendChild(el);
  return el;
}

// قطره‌های ریزی که از نقطه‌ی برخورد به اطراف می‌پرن
export function splashBeads(layer, x, y, count, spread) {
  for (let i = 0; i < count; i++) {
    const size = 4 + Math.random() * 6;
    const bead = spawn(layer, "oil-bead", {
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
    const dx = (Math.random() * 2 - 1) * spread;
    const dy = 12 + Math.random() * 22;

    play(bead, [
      { transform: "translate(-50%,-50%)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx * 0.6}px), calc(-50% - ${dy}px))`, opacity: 1, offset: 0.45 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + 8px)) scale(.4)`, opacity: 0 },
    ], { duration: 650, easing: "cubic-bezier(.2,.7,.4,1)" }).then(() => bead.remove());
  }
}

// لکه‌ی روغنی که روی نقطه‌ی برخورد پهن می‌شه و محو می‌شه
export function splashPuddle(layer, x, y, width) {
  const puddle = spawn(layer, "oil-puddle", { left: `${x}px`, top: `${y}px`, width: `${width}px` });

  play(puddle, [
    { transform: "translate(-50%,-50%) scale(.2,.5)", opacity: 1 },
    { transform: "translate(-50%,-50%) scale(1)", opacity: 0.9, offset: 0.25 },
    { transform: "translate(-50%,-50%) scale(1.3,.7)", opacity: 0 },
  ], { duration: 1600, easing: "ease-out" }).then(() => puddle.remove());
}

// قطره‌ای که از (x, fromY) تا toY سقوط می‌کنه
export async function fallingDrip(layer, x, fromY, toY) {
  const drip = spawn(layer, "oil-drip", { left: `${x - 5}px`, top: `${fromY}px` });

  await play(drip, [
    { transform: "translateY(0) scale(.4)" },
    { transform: "translateY(2px) scale(.9,1.1)", offset: 0.3 },
    { transform: `translateY(${toY - fromY - 13}px) scale(.75,1.35)` },
  ], { duration: 560, easing: "cubic-bezier(.5,0,1,.6)" });

  drip.remove();
}

// رنگ طلایی از نقطه‌ی برخورد (clientX) روی متن پخش می‌شه
export function soakText(el, clientX) {
  const rect = el.getBoundingClientRect();
  const percent = ((clientX - rect.left) / rect.width) * 100;

  el.style.setProperty("--oil-x", `${Math.min(100, Math.max(0, percent))}%`);
  el.classList.add("oil-soaked");
}

// اندازه‌ی گالن و جای دهانه‌اش در viewBox (110×130)
export const JUG_SCALE = 0.85;
export const JUG_W = 110 * JUG_SCALE;
export const JUG_H = 130 * JUG_SCALE;
const SPOUT = { x: 81 * JUG_SCALE, y: 9 * JUG_SCALE };

// گالن کجا باشه تا با زاویه‌ی deg دهانه‌اش دقیقاً روی نقطه‌ی point بیفته
export function jugPlacementFor(point, deg) {
  const t = (deg * Math.PI) / 180;
  const dx = SPOUT.x - JUG_W / 2;
  const dy = SPOUT.y - JUG_H / 2;

  return {
    x: point.x - JUG_W / 2 - (dx * Math.cos(t) - dy * Math.sin(t)),
    y: point.y - JUG_H / 2 - (dx * Math.sin(t) + dy * Math.cos(t)),
  };
}

export const jugTransform = (p, deg) => `translate(${p.x}px, ${p.y}px) rotate(${deg}deg)`;
