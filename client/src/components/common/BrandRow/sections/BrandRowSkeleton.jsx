import { ProductCardSkeleton } from "../../../ProductCard";
import ROW_ITEM_WIDTH from "../helpers/rowItemWidth";

// اسکلت یک ردیف برند موقع گرفتن محصولات: جای لوگوی برند + کارت‌های اسکلت با همون عرض ردیف واقعی
function BrandRowSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <div className="h-16 w-28 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse motion-reduce:animate-none" />
      </div>

      <div className="flex items-stretch gap-3 overflow-hidden pb-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={`flex-none ${ROW_ITEM_WIDTH}`}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandRowSkeleton;
