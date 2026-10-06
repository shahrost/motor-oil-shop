// تصویر کارت «روانکار»: یک قطره‌ی بزرگ روغن
function OilDropArt() {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true" className="h-40 w-auto drop-shadow-lg">
      <defs>
        <linearGradient id="oilDropFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd36b" />
          <stop offset="55%" stopColor="#faa61a" />
          <stop offset="100%" stopColor="#b86e00" />
        </linearGradient>
      </defs>

      <path
        d="M60 6C60 6 14 64 14 90a46 46 0 0 0 92 0C106 64 60 6 60 6Z"
        fill="url(#oilDropFill)"
      />

      <path
        d="M36 88c0-12 8-26 14-35"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default OilDropArt;
