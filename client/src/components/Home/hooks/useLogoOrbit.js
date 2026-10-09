import { useEffect, useRef } from "react";

import homeOrbitBrands from "../../../data/homeOrbitBrands";
import {
  START_ANGLE,
  orbitSlot,
  applySlot,
  edgePoint,
  flightKeyframes,
  makeChip,
} from "../helpers/logoOrbit";

const MAX_SPEED = 0.00035; // رادیان بر میلی‌ثانیه
const ACCEL = 0.0000004;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// کارت «خودروهای من»: لوگوی برندها از لبه‌های صفحه پرواز می‌کنن داخل کارت
// و دور ماشین روی بیضی سه‌بعدی می‌چرخن. ref رو به باکس تصویر (دور ماشین) بدید.
// فقط یک بار، وقتی کارت برای اولین بار دیده بشه.
function useLogoOrbit() {
  const artRef = useRef(null);

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;

    const brands = homeOrbitBrands;
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

    const layoutAll = () => chips.forEach((chip, i) => chip && applySlot(chip, orbitSlot(art, i, n, angle)));

    const startOrbit = () => {
      let last = performance.now();
      let speed = 0;
      const tick = (now) => {
        if (cancelled) return;
        const dt = Math.min(50, now - last);
        last = now;
        speed = Math.min(MAX_SPEED, speed + ACCEL * dt); // آروم راه می‌افته
        angle += speed * dt;
        layoutAll();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const land = async (brand, i) => {
      await wait(i * 110);
      if (cancelled) return;

      const chip = makeChip(brand);
      flight.appendChild(chip);

      const a = art.getBoundingClientRect();
      const slot = orbitSlot(art, i, n, angle);
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
      applySlot(chip, orbitSlot(art, i, n, angle));
    };

    const run = async () => {
      await wait(400);
      if (cancelled) return;
      await Promise.all(brands.map(land));
      if (!cancelled) startOrbit();
    };

    // کسانی که حرکت کم می‌خوان: فقط حالت نهایی، لوگوها ثابت دور ماشین
    const showFinalState = () => {
      brands.forEach((brand, i) => {
        const chip = makeChip(brand);
        orbit.appendChild(chip);
        chips[i] = chip;
      });
      layoutAll();
    };

    let observer = null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinalState();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      }, { threshold: 0.5 });
      observer.observe(art);
    }

    // اندازه‌ی کارت عوض شد ← لوگوها روی بیضی جدید
    const onResize = () => layoutAll();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      flight.querySelectorAll(".logo-chip").forEach((chip) => chip.getAnimations().forEach((an) => an.cancel()));
      flight.remove();
      orbit.remove();
    };
  }, []);

  return artRef;
}

export default useLogoOrbit;
