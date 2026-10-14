// پین قرمز لوکیشن؛ مشترک بین نقشه‌ی سفارش و بخش «محدوده فعالیت» تماس با ما
function LocationPinIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 36" className={className} aria-hidden="true">
      <path
        d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
        fill="#dc2626"
      />
      <circle cx="12" cy="12" r="4.5" fill="#fff" />
    </svg>
  );
}

export default LocationPinIcon;
