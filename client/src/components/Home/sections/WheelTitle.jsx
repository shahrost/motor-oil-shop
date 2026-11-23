import VehicleWheel from "./VehicleWheel";

// جایگزین چرخ‌دندهٔ خودرو، در همان کادر و بدون جابه‌جایی عنوان.
function WheelTitle({ title }) {
  return (
    <div data-entry="wheel-title" className="relative z-[1] w-[104px] h-[104px] sm:w-[140px] sm:h-[140px] mt-2.5">
      <svg viewBox="0 0 140 140" aria-hidden="true" className="block w-full h-full">
        <VehicleWheel cx={70} cy={70} radius={66} />
        <circle cx="70" cy="70" r="35" className="oil-plate" strokeWidth="1" />
      </svg>
      <h2
        className={`absolute inset-0 m-0 flex items-center justify-center leading-none font-extrabold text-gray-900 ${
          title.length > 8 ? "px-6 sm:px-8 text-center leading-tight text-[15px] sm:text-lg" : "text-lg sm:text-[22px]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

export default WheelTitle;
