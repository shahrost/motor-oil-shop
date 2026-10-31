// آدمک کوچیک صحنه‌ی لیموزین Hero (رو به راست کشیده شده؛ والد در جهت لازم برعکسش می‌کنه).
// راننده: کت‌وشلوار، پیراهن سفید و کلاه راننده، گالن روغن دستشه؛
// اتوسرویس‌کار: لباس‌کار سرهمی آبی با کمربند نارنجی و اتیکت، کلاه کار قرمز، آچار در دست عقب،
// دست جلو رو برای گرفتن گالن میاره و با گالن می‌ره. کلاس‌های limo-* انیمیشن پا، دست و گالن رو از index.css می‌گیرن
const LOOKS = {
  driver: {
    suit: "#334155",
    pants: "#1e293b",
    legs: ["limo-leg", "limo-leg limo-leg-alt"],
    arm: "limo-arm limo-arm-give",
    jug: "limo-jug-give",
  },
  mechanic: {
    suit: "#2563eb",
    pants: "#2563eb",
    legs: ["limo-mech-leg", "limo-mech-leg limo-leg-alt"],
    arm: "limo-arm limo-arm-take",
    jug: "limo-jug-take",
  },
};

const SKIN = "#f1c27d";
const SHOE = "#0b0f19";

function PersonArt({ role, className }) {
  const look = LOOKS[role];
  const isDriver = role === "driver";

  return (
    <svg viewBox="0 0 32 52" aria-hidden="true" className={className}>
      {/* پاها */}
      {look.legs.map((legClass, i) => (
        <g key={i} className={legClass}>
          <rect x={8.5 + i * 3.5} y="32" width="4" height="17" rx="1.5" fill={look.pants} />
          <rect x={8.5 + i * 3.5} y="47.5" width="6" height="3" rx="1" fill={SHOE} />
        </g>
      ))}

      {/* دست عقب اتوسرویس‌کار با آچار (پشت بدنه) */}
      {!isDriver && (
        <>
          <path d="M10.5 19L8.5 29" stroke={look.suit} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M8.3 30.5V38.5M6.6 38.5H10V40.4H6.6Z" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" fill="#9ca3af" />
          <circle cx="8.4" cy="30" r="1.8" fill={SKIN} />
        </>
      )}

      {/* بدنه */}
      <rect x="7" y="16" width="11" height="19" rx="4" fill={look.suit} />
      {isDriver ? (
        <path d="M10.5 16L12.5 22L14.5 16Z" fill="#fff" />
      ) : (
        <>
          <rect x="7" y="28" width="11" height="2.4" fill="#f97316" />
          <rect x="13.4" y="19.5" width="3.4" height="2.4" rx=".5" fill="#fff" />
        </>
      )}

      {/* سر و کلاه: کلاه راننده مشکی، کلاه کار قرمز */}
      <circle cx="12.5" cy="10" r="5" fill={SKIN} />
      <circle cx="15.6" cy="9.6" r=".7" fill="#1f2937" />
      {isDriver ? (
        <>
          <path d="M7.2 8.6Q7.4 3.6 12.5 3.6Q17.6 3.6 17.8 8.6Z" fill="#111827" />
          <path d="M15 8.2H20Q20 9.4 18.4 9.4H15Z" fill="#111827" />
          <circle cx="12.5" cy="6.4" r=".9" fill="#facc15" />
        </>
      ) : (
        <>
          <path d="M7.4 10.6Q6.8 8.6 7.6 8.2H9.4V10.8Z" fill="#3f2a1d" />
          <path d="M7.4 8.4Q7.4 3.8 12.5 3.8Q17.4 3.8 17.6 8.4Z" fill="#dc2626" />
          <path d="M16 7.9H20.6Q20.6 9.2 19 9.2H16Z" fill="#b91c1c" />
        </>
      )}

      {/* دست جلو + گالن روغن (از شونه می‌چرخه) */}
      <g className={look.arm}>
        <path d="M14 19L22 26" stroke={look.suit} strokeWidth="3.6" strokeLinecap="round" />
        <g className={look.jug}>
          <rect x="20" y="26" width="8" height="10" rx="1.5" fill="#faa61a" />
          <rect x="20" y="29.5" width="8" height="3" fill="#1f2d44" />
          <rect x="24.5" y="23.8" width="3" height="2.6" rx=".6" fill="#0b1424" />
        </g>
        <circle cx="22" cy="26.5" r="2" fill={SKIN} />
      </g>
    </svg>
  );
}

export default PersonArt;
