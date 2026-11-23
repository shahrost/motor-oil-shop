import { useId } from "react";

// لاستیک با دیواره و شیار واقعی، رینگ آلیاژی پنج‌پره و دیسک ترمز؛ یک گروه متحرک.
function VehicleWheel({ cx, cy, radius }) {
  const rubberId = useId();
  const alloyId = useId();

  return (
    <g transform={`translate(${cx} ${cy}) scale(${radius / 50})`}>
      <defs>
        <radialGradient id={rubberId}>
          <stop offset="0.64" stopColor="#151619" />
          <stop offset="0.77" stopColor="#323438" />
          <stop offset="0.91" stopColor="#202125" />
          <stop offset="1" stopColor="#08090b" />
        </radialGradient>
        <linearGradient id={alloyId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset=".45" stopColor="#bdc7d0" />
          <stop offset=".65" stopColor="#71808f" />
          <stop offset="1" stopColor="#e7edf2" />
        </linearGradient>
      </defs>
      <g data-vehicle="wheel-rotor">
        <circle r="50" fill={`url(#${rubberId})`} />
        <circle r="47" fill="none" stroke="#3e4044" strokeWidth=".8" />
        <circle r="44.5" fill="none" stroke="#111215" strokeWidth="1.4" />
        {Array.from({ length: 32 }, (_, i) => (
          <path key={i} d="M-1.5-49 0-47.3 1.3-48.3" transform={`rotate(${i * 11.25})`} fill="none" stroke="#515357" strokeWidth=".7" />
        ))}
        <circle r="37" fill={`url(#${alloyId})`} stroke="#07080a" strokeWidth="1.4" />
        <circle r="33.5" fill="#171b20" stroke="#f1f5f9" strokeWidth="1" />
        <circle r="27" fill="#6d747b" />
        <circle r="22" fill="none" stroke="#343a40" strokeWidth="2" strokeDasharray="1 5" />
        <path d="M21-14 28-10 28 10 21 14Z" fill="#b75c23" />
        {[0, 72, 144, 216, 288].map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path d="M-5-8-8-32-2-34 4-10Z" fill={`url(#${alloyId})`} stroke="#65727f" strokeWidth=".55" />
            <path d="M5-8 9-31 3-34-3-10Z" fill={`url(#${alloyId})`} stroke="#65727f" strokeWidth=".55" />
          </g>
        ))}
        <circle r="10" fill={`url(#${alloyId})`} stroke="#57616c" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map(angle => <circle key={angle} cy="-6.5" r="1.5" transform={`rotate(${angle})`} fill="#343a40" />)}
        <circle r="4" fill="#4d5769" stroke="#cbd0d9" strokeWidth=".8" />
      </g>
    </g>
  );
}

export default VehicleWheel;
