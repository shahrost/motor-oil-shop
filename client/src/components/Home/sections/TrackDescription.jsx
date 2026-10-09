// توضیح کارت «روانکار» داخل زنجیر تانک (چون متنش طولانیه) با دو چرخ سر و ته
function TrackWheel({ cx }) {
  return (
    <g data-oil="wheel">
      <circle cx={cx} cy="32" r="15" fill="#374154" />
      <circle cx={cx} cy="32" r="11" fill="#697386" />
      <path
        d={`M${cx} 21V43M${cx - 11} 32H${cx + 11}M${cx - 8} 24l16 16M${cx + 8} 24 ${cx - 8} 40`}
        stroke="#374154"
        strokeWidth="2.4"
      />
      <circle cx={cx} cy="32" r="4" fill="#faa61a" />
    </g>
  );
}

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
