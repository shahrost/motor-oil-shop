import VehicleWheel from "./VehicleWheel";

// دو چرخ پایین در دو سر زنجیر، با متن ثابت بین آن‌ها؛ همان اندازهٔ قاب توضیح روغن.
function VehicleTrackDescription({ description }) {
  return (
    <div data-entry="wheel-track" className="@container relative w-[340px] max-w-full -mt-1.5">
      <svg viewBox="0 0 340 64" aria-hidden="true" className="block w-full h-auto">
        <rect x="6" y="6" width="328" height="52" rx="26" fill="none" stroke="#1f2d44" strokeWidth="9" />
        <rect data-vehicle="treads" x="6" y="6" width="328" height="52" rx="26" fill="none" stroke="#4d5769" strokeWidth="12" strokeDasharray="5 7" />
        <rect x="14" y="14" width="312" height="36" rx="18" className="oil-plate" />
        <VehicleWheel cx={32} cy={32} radius={21} />
        <VehicleWheel cx={308} cy={32} radius={21} />
      </svg>
      <p className="absolute inset-0 m-0 px-[16%] flex items-center justify-center whitespace-nowrap font-bold text-gray-600 text-[min(14.5px,4cqw)]">
        {description}
      </p>
    </div>
  );
}

export default VehicleTrackDescription;
