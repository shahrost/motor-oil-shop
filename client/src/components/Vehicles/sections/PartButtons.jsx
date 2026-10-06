import { VEHICLE_PARTS, partProducts } from "../../../utils/vehicleParts";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";

// دکمه‌های بزرگ دسته‌ها (روغن موتور، فیلتر، ...) زیر مشخصات خودرو؛ عکس هر
// دکمه عکس اولین محصول همون دسته‌ست و اگه محصولی نباشه یه آیکون ساده.
function PartButtons({ parts, selected, onSelect, t }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
      {VEHICLE_PARTS.map((part) => {
        const list = partProducts(parts, part.key);
        const sample = list[0];
        const active = selected === part.key;

        return (
          <button
            key={part.key}
            type="button"
            onClick={() => onSelect(part.key)}
            aria-pressed={active}
            className={`
              flex flex-col items-center justify-center
              rounded-2xl border-2 p-3 bg-white shadow-sm transition
              hover:shadow-md hover:-translate-y-0.5
              ${active ? "border-yellow-400 ring-2 ring-yellow-300 bg-yellow-50" : "border-gray-200 hover:border-yellow-400"}
            `}
          >
            <div className="h-20 w-full flex items-center justify-center">
              {sample ? (
                <img
                  src={getProductImageSrc(sample, 240)}
                  alt=""
                  loading="lazy"
                  onError={handleProductImageError(sample)}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-5xl" aria-hidden="true">
                  {part.icon}
                </span>
              )}
            </div>

            <span className="mt-2 font-extrabold text-gray-900 text-sm sm:text-base">
              {t(`vehicles.parts.${part.key}`)}
            </span>

            <span className="text-xs font-bold text-gray-500 mt-0.5">
              {list.length} {t("vehicles.parts.items")}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default PartButtons;
