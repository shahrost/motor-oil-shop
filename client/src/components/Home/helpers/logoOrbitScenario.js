// لوگوهای کارت «خودروهای من» و «روانکار» از ابتدا روی مدار قرار دارن
// و دور تصویر وسط روی بیضی سه‌بعدی می‌چرخن (هندسه در logoOrbit).

import { isFrozen } from "./animate";
import {
  START_ANGLE,
  artSize,
  orbitSlot,
  applySlot,
  makeChip,
} from "./logoOrbit";

const SPEED = 0.00035; // رادیان بر میلی‌ثانیه

// art: باکس تصویر وسط کارت؛ ellipse: شکل مدار (carEllipse یا dropEllipse از logoOrbit).
// خروجی: run (چرخش فوری)، showFinalState (حرکت کم)،
// layout (چیدن دوباره بعد از تغییر اندازه) و destroy (پاک‌سازی موقع unmount)
export function createLogoOrbit(art, brands, ellipse) {
  const n = brands.length;
  let cancelled = false;
  let raf = 0;
  let angle = START_ANGLE;

  // همه‌ی لوگوها از ابتدا داخل کارت هستن.
  const orbit = document.createElement("div");
  orbit.className = "logo-orbit";
  art.appendChild(orbit);

  const chips = brands.map((brand) => {
    const chip = makeChip(brand);
    orbit.appendChild(chip);
    return chip;
  });

  const layout = () => {
    const size = artSize(art);
    chips.forEach((chip, i) => applySlot(chip, orbitSlot(size, i, n, angle, ellipse)));
  };
  layout();

  // چرخش فقط وقتی کارت روی صفحه‌ست؛ بیرون از دید، CPU گوشی آزاد می‌مونه
  let orbiting = false;
  let onScreen = true;
  let last = 0;

  const tick = (now) => {
    if (cancelled || !onScreen || isFrozen(art)) {
      raf = 0;
      return;
    }
    const dt = Math.min(50, now - last);
    last = now;
    angle += SPEED * dt;
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

  return {
    run: startOrbit,

    // کسانی که حرکت کم می‌خوان: فقط حالت نهایی، لوگوها ثابت دور ماشین
    showFinalState: layout,

    layout,

    destroy() {
      cancelled = true;
      cancelAnimationFrame(raf);
      visibility.disconnect();
      orbit.remove();
    },
  };
}
