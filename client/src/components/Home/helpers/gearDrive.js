// سیستم انتقال کارت «روانکار»: چرخ‌دنده ← زنجیر تانک ← چرخ‌ها.
// چرخ‌دنده ساعتگرد می‌چرخه و دندونه‌های پایینش آج‌های بالای زنجیر رو به چپ
// هل می‌دن؛ زنجیر و چرخ‌هاش پادساعتگرد می‌چرخن. سرعت‌ها با هم جورن:
// سرعت لبه‌ی دندونه = سرعت زنجیر = سرعت لبه‌ی چرخ‌ها.

const GEAR_R = 60;
const WHEEL_R = 15;
const TREAD_PITCH = 12;
const GEAR_PERIOD = 4000;
const RAMP_MS = 1600;

function spin(el, deg, duration) {
  el.style.transformBox = "fill-box";
  el.style.transformOrigin = "center";

  return el.animate(
    [{ transform: "rotate(0deg)" }, { transform: `rotate(${deg}deg)` }],
    { duration, iterations: Infinity },
  );
}

function createGearDrive({ gearRotor, gearBody, wheels, treads }) {
  const speed = (2 * Math.PI * GEAR_R) / GEAR_PERIOD; // px بر میلی‌ثانیه

  const drive = [
    spin(gearRotor, 360, GEAR_PERIOD),
    ...wheels.map((wheel) => spin(wheel, -360, (2 * Math.PI * WHEEL_R) / speed)),
    treads.animate(
      [{ strokeDashoffset: 0 }, { strokeDashoffset: TREAD_PITCH }],
      { duration: TREAD_PITCH / speed, iterations: Infinity },
    ),
  ];

  const setRate = (rate) => drive.forEach((a) => { a.playbackRate = rate; });

  let stuckTimer = null;
  let rampId = 0;

  // خشک: چرخ‌دنده هر چند ثانیه یه تکون می‌خوره ولی گیر می‌کنه
  const stuck = () => {
    gearBody.animate([
      { transform: "rotate(0)" },
      { transform: "rotate(4deg)" },
      { transform: "rotate(-1.5deg)" },
      { transform: "rotate(2deg)" },
      { transform: "rotate(0)" },
    ], { duration: 450, easing: "ease-out" });
  };

  return {
    // قبل از روغن همه‌چی ثابته
    dryUp() {
      rampId++;
      setRate(0);
      drive.forEach((a) => { a.currentTime = 0; });
      clearInterval(stuckTimer);
      stuckTimer = setInterval(stuck, 1600);
    },

    // روغن‌کاری: سیستم آروم راه می‌افته و به سرعت کامل می‌رسه
    lubricate({ instant = false } = {}) {
      clearInterval(stuckTimer);
      if (instant) {
        rampId++;
        setRate(1);
        return;
      }

      const id = ++rampId;
      const t0 = performance.now();
      const step = (now) => {
        if (id !== rampId) return;
        const p = Math.min(1, (now - t0) / RAMP_MS);
        setRate(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },

    stop() {
      rampId++;
      clearInterval(stuckTimer);
      drive.forEach((a) => a.cancel());
    },
  };
}

export default createGearDrive;
