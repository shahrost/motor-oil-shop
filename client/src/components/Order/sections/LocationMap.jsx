import { useContext } from "react";
import LanguageContext from "../../../context/LanguageContext";
import useLocationMap from "../hooks/useLocationMap";

// نقشه‌ی انتخاب موقعیت؛ جدا (lazy) لود می‌شه تا Leaflet فقط برای کسی که نقشه رو باز می‌کنه دانلود بشه
function LocationMap({ location, onPick }) {
  const { t } = useContext(LanguageContext);
  const { containerRef, locate, locating, geoError } = useLocationMap(
    location,
    onPick,
  );

  return (
    <div>
      {/* isolate: z-indexهای Leaflet (تا ۱۰۰۰) نباید روی هدر چسبان سایت بیفتن */}
      <div
        dir="ltr"
        className="relative isolate h-72 rounded-xl overflow-hidden border"
      >
        <div ref={containerRef} className="h-full w-full" />

        {/* پین ثابت وسط نقشه؛ نوک پین دقیقاً روی مرکز */}
        <svg
          viewBox="0 0 24 36"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1000] h-10 w-7 -translate-x-1/2 -translate-y-full drop-shadow"
          aria-hidden="true"
        >
          <path
            d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z"
            fill="#dc2626"
          />
          <circle cx="12" cy="12" r="4.5" fill="#fff" />
        </svg>

        <button
          type="button"
          onClick={locate}
          disabled={locating}
          title={t("order.customerInfo.location.locate")}
          aria-label={t("order.customerInfo.location.locate")}
          className="absolute right-3 top-3 z-[1000] flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg border hover:bg-gray-50 disabled:opacity-70"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${locating ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
            <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
          </svg>
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {locating
          ? t("order.customerInfo.location.locating")
          : t("order.customerInfo.location.hint")}
      </p>

      {geoError && (
        <p className="mt-2 bg-red-100 text-red-700 rounded-xl p-3 text-sm font-bold">
          {t(`order.customerInfo.location.errors.${geoError}`)}
        </p>
      )}
    </div>
  );
}

export default LocationMap;
