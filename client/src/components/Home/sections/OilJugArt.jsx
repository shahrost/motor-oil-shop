import { JUG_W, JUG_H } from "../helpers/oilFx";

// گالن روغن کارت «روانکار» (بدنه‌ی سرمه‌ای + برچسب کهربایی، دهانه بالا سمت راست)
function OilJugArt() {
  return (
    <svg
      data-oil="jug"
      viewBox="0 0 110 130"
      aria-hidden="true"
      className="oil-jug"
      style={{ width: JUG_W, height: JUG_H }}
    >
      <defs>
        <linearGradient id="oilJugBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2b3d5c" />
          <stop offset=".22" stopColor="#3a5078" />
          <stop offset=".5" stopColor="#1f2d44" />
          <stop offset="1" stopColor="#0b1424" />
        </linearGradient>
        <linearGradient id="oilJugLabel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc566" />
          <stop offset=".5" stopColor="#faa61a" />
          <stop offset="1" stopColor="#d67a00" />
        </linearGradient>
      </defs>

      <path
        fill="url(#oilJugBody)"
        fillRule="evenodd"
        d="M14 124H96Q102 124 102 118V42Q102 36 97 32L90 26V13H72V26L62 32H46V16Q46 8 38 8H16Q8 8 8 16V118Q8 124 14 124ZM20 16H34Q37 16 37 19V26Q37 29 34 29H20Q17 29 17 26V19Q17 16 20 16Z"
      />
      <rect x="69" y="8" width="24" height="7" rx="2" fill="#d67a00" />
      <ellipse cx="81" cy="9" rx="8" ry="2" fill="#6b3d0a" />
      <path d="M14 40V112" stroke="#fff" strokeOpacity=".22" strokeWidth="4" strokeLinecap="round" />

      <rect x="20" y="50" width="74" height="60" rx="6" fill="url(#oilJugLabel)" />
      <rect x="20" y="50" width="74" height="13" rx="6" fill="#0b1424" fillOpacity=".85" />
      <text x="57" y="60" textAnchor="middle" fontWeight="800" fontSize="8.5" fill="#faa61a">SHAHRAM</text>
      <text x="57" y="84" textAnchor="middle" fontWeight="800" fontSize="15" fill="#0b1424">5W-30</text>
      <text x="57" y="99" textAnchor="middle" fontWeight="700" fontSize="7.5" fill="#152238">MOTOR OIL · 4L</text>
      <path d="M20 66H94" stroke="#0b1424" strokeOpacity=".25" />
    </svg>
  );
}

export default OilJugArt;
