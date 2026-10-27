import { partProducts } from "../../../utils/vehicleParts";
import VEHICLE_PARTS from "../../../data/vehicleParts";
import {
  getProductImageSrc,
  handleProductImageError,
} from "../../../utils/productImage";

// نوار دسته‌ها (روغن موتور، فیلتر، ...) زیر مشخصات خودرو؛ عکس هر کارت عکس اولین
// محصول همون دسته‌ست و اگه محصولی نباشه یه آیکون ساده. اگه جا نشه افقی اسکرول می‌شه
// (w-max + mx-auto: وقتی جا می‌شه وسط‌چینه و وقتی نمی‌شه از اول قابل اسکروله).
function PartButtons({ parts, selected, onSelect, t }) {
  return (
    <div className="overflow-x-auto pt-1 pb-4 -mx-5 px-5">
      <div role="tablist" className="flex w-max mx-auto gap-3">
        {VEHICLE_PARTS.map((part) => {
          const list = partProducts(parts, part.key);
          const sample = list[0];
          const active = selected === part.key;

          // دسته‌ی بدون محصول نمایش داده نمی‌شه (مگر همونی که الان انتخاب شده، مثلاً از لینک ?part=)
          if (!list.length && !active) return null;

          return (
            <button
              key={part.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(part.key)}
              className={`
                relative flex w-28 sm:w-36 shrink-0 flex-col items-center
                rounded-2xl border-2 bg-white p-3 shadow-sm transition
                hover:shadow-md hover:-translate-y-0.5
                ${active ? "border-yellow-400 ring-2 ring-yellow-300" : "border-gray-200 hover:border-yellow-400"}
              `}
            >
              <div className="h-14 sm:h-16 w-full flex items-center justify-center">
                {sample ? (
                  <img
                    src={getProductImageSrc(sample, 240)}
                    alt=""
                    loading="lazy"
                    onError={handleProductImageError(sample)}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <part.icon size={40} className="text-gray-400" />
                )}
              </div>

              <span className="mt-2 font-extrabold text-gray-900 text-sm">
                {t(`vehicles.parts.${part.key}`)}
              </span>

              <span className="text-xs font-bold text-gray-500 mt-0.5">
                {list.length} {t("vehicles.parts.items")}
              </span>

              {active && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2.5 inset-x-6 h-1 rounded-full bg-yellow-400"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PartButtons;
