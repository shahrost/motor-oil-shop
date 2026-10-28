// سناریوی لوگوهای چرخان (کارت «خودروهای من» و «روانکار»): لوگوی برندها از لبه‌های صفحه
// پرواز می‌کنن داخل کارت و دور تصویر وسط روی بیضی سه‌بعدی می‌چرخن (هندسه در logoOrbit).

import { wait, isFrozen } from "./animate";
import {
  START_ANGLE,
  artSize,
  orbitSlot,
  applySlot,
  edgePoint,
  flightKeyframes,
  makeChip,
} from "./logoOrbit";

const MAX_SPEED = 0.00035; // رادیان بر میلی‌ثانیه
const ACCEL = 0.0000004;

// art: باکس تصویر وسط کارت؛ ellipse: شکل مدار (carEllipse یا dropEllipse از logoOrbit).
// خروجی: run (انیمیشن کامل)، showFinalState (حرکت کم)،
// layout (چیدن دوباره بعد از تغییر اندازه) و destroy (پاک‌سازی موقع unmount)
export function createLogoOrbit(art, brands, ellipse) {
  const n = brands.length;
  let cancelled = false;
  let raf = 0;
  let angle = START_ANGLE;
  const chips = [];

  // لوگوها روی ماشین در لایه‌ی orbit، و در حال پرواز در لایه‌ی fixed روی کل صفحه
  const orbit = document.createElement("div");
  orbit.className = "logo-orbit";
  art.appendChild(orbit);

  const flight = document.createElement("div");
  flight.className = "logo-flight";
  document.body.appendChild(flight);

  const layout = () => {
    const size = artSize(art);
    chips.forEach((chip, i) => chip && applySlot(chip, orbitSlot(size, i, n, angle, ellipse)));
  };

  // چرخش فقط وقتی کارت روی صفحه‌ست؛ بیرون از دید، CPU گوشی آزاد می‌مونه
  let orbiting = false;
  let onScreen = true;
  let last = 0;
  let speed = 0;

  const tick = (now) => {
    if (cancelled || !onScreen || isFrozen(art)) {
      raf = 0;
      return;
    }
    const dt = Math.min(50, now - last);
    last = now;
    speed = Math.min(MAX_SPEED, speed + ACCEL * dt); // آروم راه می‌افته
    angle += speed * dt;
    layout();
    raf = requestAnimationFrame(tick);
  };

  const resume = () => {
    if (!orbiting || raf || cancelled) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };

  const startOrbit = () => {
    orbiting = true;
    resume();
  };

  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) resume();
  });
  visibility.observe(art);

  const land = async (brand, i) => {
    await wait(i * 110);
    if (cancelled) return;

    const chip = makeChip(brand);
    flight.appendChild(chip);

    const a = art.getBoundingClientRect();
    const slot = orbitSlot(artSize(art), i, n, angle, ellipse);
    const to = { x: a.left + slot.x, y: a.top + slot.y };

    try {
      await chip.animate(flightKeyframes(edgePoint(i), to, slot), {
        duration: 1300,
        easing: "cubic-bezier(.3,.6,.35,1)",
        fill: "forwards",
      }).finished;
    } catch {
      return; // با unmount لغو شد
    }
    if (cancelled) return;

    // فرود: از لایه‌ی پرواز به داخل کارت منتقل می‌شه
    chip.getAnimations().forEach((an) => an.cancel());
    orbit.appendChild(chip);
    chips[i] = chip;
    applySlot(chip, orbitSlot(artSize(art), i, n, angle, ellipse));
  };

  return {
    async run() {
      await wait(400);
      if (cancelled) return;
      await Promise.all(brands.map(land));
      if (!cancelled) startOrbit();
    },

    // کسانی که حرکت کم می‌خوان: فقط حالت نهایی، لوگوها ثابت دور ماشین
    showFinalState() {
      brands.forEach((brand, i) => {
        const chip = makeChip(brand);
        orbit.appendChild(chip);
        chips[i] = chip;
      });
      layout();
    },

    layout,

    destroy() {
      cancelled = true;
      cancelAnimationFrame(raf);
      visibility.disconnect();
      flight.querySelectorAll(".logo-chip").forEach((chip) => chip.getAnimations().forEach((an) => an.cancel()));
      flight.remove();
      orbit.remove();
    },
  };
}
