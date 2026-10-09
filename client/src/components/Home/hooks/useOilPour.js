import { useEffect, useRef } from "react";

import createGearDrive from "../helpers/gearDrive";
import { wait, play, prefersReducedMotion, onceVisible } from "../helpers/animate";
import {
  splashBeads,
  splashPuddle,
  fallingDrip,
  soakText,
  JUG_W,
  jugPlacementFor,
  jugTransform,
} from "../helpers/oilFx";

const TILT = 58;

// سناریوی انیمیشن کارت «روانکار»:
// ۱) قطره‌ی بزرگ از بالای کارت می‌افته  ۲) گالن از چپ میاد و روی چرخ‌دنده می‌ریزه
// ۳) «روانکار» طلایی می‌شه و چرخ‌دنده زنجیر تانک رو به حرکت درمیاره
// ۴) قطره‌ها روی زنجیر می‌چکن و توضیح هم طلایی می‌شه  ۵) گالن برمی‌گرده بیرون
// فقط یک بار، وقتی کارت برای اولین بار دیده بشه.
function useOilPour() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // تکه‌های کارت با data-oil علامت خوردن
    const part = (name) => card.querySelector(`[data-oil="${name}"]`);
    const el = {
      card,
      drop: part("drop"),
      gear: part("gear"),
      gearBody: part("gear-body"),
      gearRotor: part("gear-rotor"),
      track: part("track"),
      treads: part("treads"),
      title: part("title"),
      desc: part("desc"),
      layer: part("layer"),
      jug: part("jug"),
      stream: part("stream"),
      wheels: [...card.querySelectorAll('[data-oil="wheel"]')],
    };
    if (Object.values(el).some((node) => !node) || el.wheels.length !== 2) return;

    const drive = createGearDrive({
      gearRotor: el.gearRotor,
      gearBody: el.gearBody,
      wheels: el.wheels,
      treads: el.treads,
    });

    let cancelled = false;
    const alive = () => !cancelled;

    const reduceMotion = prefersReducedMotion();

    const showFinalState = () => {
      el.drop.style.opacity = "1";
      el.title.classList.add("oil-soaked");
      el.desc.classList.add("oil-soaked");
    };

    const run = async () => {
      const { card, drop, gear, track, title, desc, layer, jug, stream } = el;
      drive.dryUp();

      const c = card.getBoundingClientRect();
      const g = gear.getBoundingClientRect();
      const t = track.getBoundingClientRect();
      const d = drop.getBoundingClientRect();
      const gx = g.left + g.width / 2 - c.left;
      const gy = g.top + g.height / 2 - c.top;

      // ۰) قطره‌ی بزرگ از بالای کارت می‌افته و سر جاش می‌شینه
      drop.style.opacity = "1";
      await play(drop, [
        { transform: `translateY(${-(d.bottom - c.top + 10)}px) scale(.9, 1.12)` },
        { transform: "translateY(0) scale(.9, 1.12)", offset: 0.55, easing: "ease-out" },
        { transform: "translateY(0) scale(1.18, .8)", offset: 0.68, easing: "ease-in-out" },
        { transform: "translateY(0) scale(.94, 1.06)", offset: 0.82, easing: "ease-in-out" },
        { transform: "translateY(0) scale(1)" },
      ], { duration: 1200, easing: "cubic-bezier(.5,0,.9,.5)" });
      if (!alive()) return;

      const spout = { x: gx - 44, y: g.top - c.top - 22 };   // دهانه‌ی گالن موقع ریختن
      const impact = { x: gx + 2, y: gy - 12 };              // جای برخورد روی «روانکار»
      const tilted = jugPlacementFor(spout, TILT);
      const upright = { x: tilted.x, y: tilted.y - 6 };
      const offLeft = { x: -JUG_W - 40, y: tilted.y + 10 };

      jug.style.opacity = "1";
      jug.style.transform = jugTransform(offLeft, -12);
      await wait(300);
      if (!alive()) return;

      // ۱) گالن از چپ وارد می‌شه
      await play(jug, [
        { transform: jugTransform(offLeft, -12) },
        { transform: jugTransform({ x: upright.x + 8, y: upright.y }, 4), offset: 0.8 },
        { transform: jugTransform(upright, 0) },
      ], { duration: 1000, easing: "cubic-bezier(.2,.8,.3,1)" });
      if (!alive()) return;

      // ۲) کج می‌شه
      await play(jug, [
        { transform: jugTransform(upright, 0) },
        { transform: jugTransform(jugPlacementFor(spout, TILT + 6), TILT + 6), offset: 0.75 },
        { transform: jugTransform(tilted, TILT) },
      ], { duration: 650, easing: "ease-in-out" });
      if (!alive()) return;

      // ۳) جریان روغن تا روی «روانکار»
      stream.setAttribute(
        "d",
        `M${spout.x} ${spout.y} Q${spout.x + (impact.x - spout.x) * 1.15} ${spout.y - 6} ${impact.x} ${impact.y}`,
      );
      const len = stream.getTotalLength();
      stream.style.strokeDasharray = `${len} ${len}`;
      stream.style.opacity = "1";
      await play(stream, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 320, easing: "ease-in" });
      if (!alive()) return;

      splashPuddle(layer, impact.x, impact.y + 4, 80);
      soakText(title, impact.x + c.left);
      drive.lubricate();
      for (let i = 0; i < 8 && alive(); i++) {
        splashBeads(layer, impact.x, impact.y, 2, 30);
        await wait(110);
      }
      if (!alive()) return;

      // ۴) قطره‌ها از چرخ‌دنده روی زنجیر می‌چکن
      const fromY = g.bottom - c.top - 8;
      const toY = t.top + t.height / 2 - c.top - 6;
      const drips = [-14, 6, -2].map(async (offset, i) => {
        await wait(i * 260);
        if (!alive()) return;
        const x = gx + offset;
        await fallingDrip(layer, x, fromY, toY);
        if (!alive()) return;
        splashBeads(layer, x, toY, 4, 26);
        splashPuddle(layer, x, toY, 60);
        if (i === 0) soakText(desc, x + c.left);
      });

      // تمام شدن جریان: دم جریان جدا می‌شه و می‌افته
      await wait(350);
      await play(stream, [{ strokeDashoffset: 0 }, { strokeDashoffset: -len }], { duration: 300, easing: "ease-in" });
      stream.style.opacity = "0";
      await Promise.all(drips);
      if (!alive()) return;

      // ۵) گالن صاف می‌شه و از چپ بیرون می‌ره
      await play(jug, [
        { transform: jugTransform(tilted, TILT) },
        { transform: jugTransform(upright, 0), offset: 0.45 },
        { transform: jugTransform(offLeft, -10) },
      ], { duration: 1100, easing: "cubic-bezier(.5,0,.6,1)" });
      jug.style.opacity = "0";
    };

    if (reduceMotion) {
      showFinalState();
      return () => drive.stop();
    }

    const stopWatching = onceVisible(el.card, run);

    return () => {
      cancelled = true;
      stopWatching();
      drive.stop();
      [el.drop, el.jug, el.stream].forEach((node) => node.getAnimations().forEach((a) => a.cancel()));
      el.layer.querySelectorAll(".oil-bead, .oil-puddle, .oil-drip").forEach((node) => node.remove());
      el.title.classList.remove("oil-soaked");
      el.desc.classList.remove("oil-soaked");
      el.drop.style.opacity = "";
      el.jug.style.opacity = "";
      el.stream.style.opacity = "";
    };
  }, []);

  return cardRef;
}

export default useOilPour;
