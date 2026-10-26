import { Check, MapPin } from "lucide-react";
import { Suspense, lazy, useContext, useState } from "react";
import LanguageContext from "../../../context/LanguageContext";

const LocationMap = lazy(() => import("./LocationMap"));

// دکمه‌ی «انتخاب موقعیت روی نقشه» زیر آدرس دقیق؛ موقعیت اختیاریه و کنار آدرس متنی ثبت می‌شه
function LocationPicker({ location, onChange }) {
  const { t } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-5">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex items-center gap-2 border-2 border-blue-600 text-blue-700 rounded-xl px-4 py-3 font-bold hover:bg-blue-50 transition"
        >
          <MapPin />
          {open
            ? t("order.customerInfo.location.close")
            : t("order.customerInfo.location.open")}
        </button>

        {location && (
          <>
            <span className="text-green-700 font-bold text-sm flex items-center gap-1">
              <Check size={16} /> {t("order.customerInfo.location.picked")}
            </span>

            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-sm text-red-600 underline"
            >
              {t("order.customerInfo.location.clear")}
            </button>
          </>
        )}
      </div>

      {open && (
        <div className="mt-3">
          <Suspense
            fallback={
              <div className="h-72 rounded-xl border flex items-center justify-center text-gray-500">
                {t("order.customerInfo.location.loading")}
              </div>
            }
          >
            <LocationMap location={location} onPick={onChange} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default LocationPicker;
