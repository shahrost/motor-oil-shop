// چرخ سر و ته زنجیر تانک کارت «روانکار» (با چرخ‌دنده می‌چرخه)
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

export default TrackWheel;
