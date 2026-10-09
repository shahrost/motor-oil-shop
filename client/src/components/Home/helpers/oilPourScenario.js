// سناریوی انیمیشن کارت «روانکار»، مرحله به مرحله:
// ۱) قطره‌ی بزرگ از بالای کارت می‌افته  ۲) گالن از چپ میاد و کج می‌شه
// ۳) جریان روغن روی چرخ‌دنده؛ «روانکار» طلایی می‌شه و زنجیر تانک راه می‌افته
// ۴) قطره‌ها روی زنجیر می‌چکن و توضیح هم طلایی می‌شه  ۵) گالن برمی‌گرده بیرون
// alive() بعد از هر مرحله چک می‌شه تا با unmount ادامه پیدا نکنه.

import { wait, play } from "./animate";
import {
  splashBeads,
  splashPuddle,
  fallingDrip,
  soakText,
  JUG_W,
  jugPlacementFor,
  jugTransform,
} from "./oilFx";

const TILT = 58;

// تکه‌های کارت که با data-oil علامت خوردن؛ اگه چیزی کم باشه null
export function collectOilParts(card) {
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

  if (Object.values(el).some((node) => !node) || el.wheels.length !== 2) return null;

  return el;
}

// اندازه‌ها و نقطه‌های کلیدی نسبت به کارت
function measure({ card, gear, track, drop }) {
  const c = card.getBoundingClientRect();
  const g = gear.getBoundingClientRect();
  const t = track.getBoundingClientRect();
  const d = drop.getBoundingClientRect();
  const gx = g.left + g.width / 2 - c.left;
  const gy = g.top + g.height / 2 - c.top;

  const spout = { x: gx - 44, y: g.top - c.top - 22 }; // دهانه‌ی گالن موقع ریختن
  const tilted = jugPlacementFor(spout, TILT);
  const upright = { x: tilted.x, y: tilted.y - 6 };

  return {
    c,
    gx,
    dropRise: d.bottom - c.top + 10,
    spout,
    impact: { x: gx + 2, y: gy - 12 }, // جای برخورد روی «روانکار»
    tilted,
    upright,
    offLeft: { x: -JUG_W - 40, y: tilted.y + 10 },
    dripFromY: g.bottom - c.top - 8,
    dripToY: t.top + t.height / 2 - c.top - 6,
  };
}

// ۱) قطره‌ی بزرگ از بالای کارت می‌افته و سر جاش می‌شینه
async function dropFall({ drop }, m) {
  drop.style.opacity = "1";
  await play(drop, [
    { transform: `translateY(${-m.dropRise}px) scale(.9, 1.12)` },
    { transform: "translateY(0) scale(.9, 1.12)", offset: 0.55, easing: "ease-out" },
    { transform: "translateY(0) scale(1.18, .8)", offset: 0.68, easing: "ease-in-out" },
    { transform: "translateY(0) scale(.94, 1.06)", offset: 0.82, easing: "ease-in-out" },
    { transform: "translateY(0) scale(1)" },
  ], { duration: 1200, easing: "cubic-bezier(.5,0,.9,.5)" });
}

// ۲) گالن از چپ وارد می‌شه و کج می‌شه
async function jugIn({ jug }, m, alive) {
  jug.style.opacity = "1";
  jug.style.transform = jugTransform(m.offLeft, -12);
  await wait(300);
  if (!alive()) return;

  await play(jug, [
    { transform: jugTransform(m.offLeft, -12) },
    { transform: jugTransform({ x: m.upright.x + 8, y: m.upright.y }, 4), offset: 0.8 },
    { transform: jugTransform(m.upright, 0) },
  ], { duration: 1000, easing: "cubic-bezier(.2,.8,.3,1)" });
  if (!alive()) return;

  await play(jug, [
    { transform: jugTransform(m.upright, 0) },
    { transform: jugTransform(jugPlacementFor(m.spout, TILT + 6), TILT + 6), offset: 0.75 },
    { transform: jugTransform(m.tilted, TILT) },
  ], { duration: 650, easing: "ease-in-out" });
}

// ۳) جریان روغن تا روی «روانکار»، پاشش و راه افتادن چرخ‌دنده؛ خروجی: طول مسیر جریان
async function pour({ stream, layer, title }, m, drive, alive) {
  const { spout, impact } = m;

  stream.setAttribute(
    "d",
    `M${spout.x} ${spout.y} Q${spout.x + (impact.x - spout.x) * 1.15} ${spout.y - 6} ${impact.x} ${impact.y}`,
  );
  const len = stream.getTotalLength();
  stream.style.strokeDasharray = `${len} ${len}`;
  stream.style.opacity = "1";
  await play(stream, [{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 320, easing: "ease-in" });
  if (!alive()) return len;

  splashPuddle(layer, impact.x, impact.y + 4, 80);
  soakText(title, impact.x + m.c.left);
  drive.lubricate();
  for (let i = 0; i < 8 && alive(); i++) {
    splashBeads(layer, impact.x, impact.y, 2, 30);
    await wait(110);
  }

  return len;
}

// ۴) قطره‌ها از چرخ‌دنده روی زنجیر می‌چکن و توضیح طلایی می‌شه
function dripOnTrack({ layer, desc }, m, alive) {
  return Promise.all([-14, 6, -2].map(async (offset, i) => {
    await wait(i * 260);
    if (!alive()) return;
    const x = m.gx + offset;
    await fallingDrip(layer, x, m.dripFromY, m.dripToY);
    if (!alive()) return;
    splashBeads(layer, x, m.dripToY, 4, 26);
    splashPuddle(layer, x, m.dripToY, 60);
    if (i === 0) soakText(desc, x + m.c.left);
  }));
}

// تمام شدن جریان: دم جریان جدا می‌شه و می‌افته
async function streamEnd({ stream }, len) {
  await wait(350);
  await play(stream, [{ strokeDashoffset: 0 }, { strokeDashoffset: -len }], { duration: 300, easing: "ease-in" });
  stream.style.opacity = "0";
}

// ۵) گالن صاف می‌شه و از چپ بیرون می‌ره
async function jugOut({ jug }, m) {
  await play(jug, [
    { transform: jugTransform(m.tilted, TILT) },
    { transform: jugTransform(m.upright, 0), offset: 0.45 },
    { transform: jugTransform(m.offLeft, -10) },
  ], { duration: 1100, easing: "cubic-bezier(.5,0,.6,1)" });
  jug.style.opacity = "0";
}

export async function runOilPour(el, drive, alive) {
  drive.dryUp();
  const m = measure(el);

  await dropFall(el, m);
  if (!alive()) return;

  await jugIn(el, m, alive);
  if (!alive()) return;

  const len = await pour(el, m, drive, alive);
  if (!alive()) return;

  const drips = dripOnTrack(el, m, alive);
  await streamEnd(el, len);
  await drips;
  if (!alive()) return;

  await jugOut(el, m);
}

// حالت نهایی برای کسانی که حرکت کم می‌خوان
export function showOilFinalState({ drop, title, desc }) {
  drop.style.opacity = "1";
  title.classList.add("oil-soaked");
  desc.classList.add("oil-soaked");
}

// برگردوندن کارت به حالت اول (unmount)
export function resetOilPour(el) {
  [el.drop, el.jug, el.stream].forEach((node) => node.getAnimations().forEach((a) => a.cancel()));
  el.layer.querySelectorAll(".oil-bead, .oil-puddle, .oil-drip").forEach((node) => node.remove());
  el.title.classList.remove("oil-soaked");
  el.desc.classList.remove("oil-soaked");
  el.drop.style.opacity = "";
  el.jug.style.opacity = "";
  el.stream.style.opacity = "";
}
