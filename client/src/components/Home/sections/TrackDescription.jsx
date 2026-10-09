import TrackWheel from "./TrackWheel";

// توضیح کارت «روانکار» داخل زنجیر تانک (چون متنش طولانیه) با دو چرخ سر و ته
function TrackDescription({ description }) {
  return (
    <div data-oil="track" className="relative w-[340px] max-w-full -mt-1.5">
      <svg viewBox="0 0 340 64" aria-hidden="true" className="block w-full h-auto">
        <rect x="6" y="6" width="328" height="52" rx="26" fill="none" stroke="#1f2d44" strokeWidth="9" />
        <rect
          data-oil="treads"
          x="6"
          y="6"
          width="328"
          height="52"
          rx="26"
          fill="none"
          stroke="#4d5769"
          strokeWidth="12"
          strokeDasharray="5 7"
        />
        <rect x="14" y="14" width="312" height="36" rx="18" className="oil-plate" />

        <TrackWheel cx={32} />
        <TrackWheel cx={308} />
      </svg>

      <p
        data-oil="desc"
        className={`oil-text oil-text-desc absolute inset-0 m-0 px-[15%] flex items-center justify-center whitespace-nowrap font-bold text-gray-600 ${
          description.length > 36 ? "text-[12px]" : "text-[14.5px]"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

export default TrackDescription;
