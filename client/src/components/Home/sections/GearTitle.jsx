// عنوان کارت «روانکار» وسط یک چرخ‌دنده‌ی فلزی؛ دندونه‌های پایینش با زنجیر تانک درگیرن
function GearTitle({ title }) {
  const bolts = [[70, 19], [114.2, 44.5], [114.2, 95.5], [70, 121], [25.8, 95.5], [25.8, 44.5]];

  return (
    <div data-oil="gear" className="relative z-[1] w-[140px] h-[140px] mt-2.5">
      <svg data-oil="gear-body" viewBox="0 0 140 140" aria-hidden="true" className="block w-full h-full">
        <defs>
          <radialGradient id="oilGearMetal" cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="#98a1b0" />
            <stop offset=".6" stopColor="#4d5769" />
            <stop offset="1" stopColor="#1f2d44" />
          </radialGradient>
        </defs>

        <g data-oil="gear-rotor">
          <circle cx="70" cy="70" r="60" fill="none" stroke="#374154" strokeWidth="16" strokeDasharray="11.78 11.78" />
          <circle cx="70" cy="70" r="56" fill="url(#oilGearMetal)" />
          <g fill="#cbd0d9">
            {bolts.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.6" />
            ))}
          </g>
        </g>

        <circle cx="70" cy="70" r="45" className="oil-plate" strokeWidth="2" />
      </svg>

      <h2
        data-oil="title"
        className={`oil-text oil-text-title absolute inset-0 m-0 flex items-center justify-center leading-none font-extrabold text-gray-900 ${
          title.length > 8 ? "text-base" : "text-[22px]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export default GearTitle;
