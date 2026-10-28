const BLOCK = "rounded-md bg-gray-200 dark:bg-white/10";

// اسکلت کارت محصول موقع گرفتن محصولات: همون قاب، padding و ارتفاع بخش‌های کارت واقعی
// (عکس ۴:۳، برند، اسم دو خط، مشخصات، قیمت، کنترل‌ها و دکمه) تا با رسیدن داده صفحه جابه‌جا نشه.
// pulse ملایم (opacity)؛ با prefers-reduced-motion ثابت
function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="@container h-full flex flex-col rounded-xl border border-gray-200 bg-white p-2 sm:p-3 shadow-sm animate-pulse motion-reduce:animate-none"
    >
      <div className={`aspect-[4/3] ${BLOCK} rounded-lg`} />

      <div className="mt-2 space-y-1.5">
        <div className={`h-3 w-1/3 ${BLOCK}`} />
        <div className={`h-4 w-11/12 ${BLOCK}`} />
        <div className={`h-4 w-2/3 ${BLOCK}`} />
        <div className={`h-3 w-1/2 ${BLOCK}`} />
        <div className={`h-3 w-2/5 ${BLOCK}`} />
      </div>

      <div className="mt-auto pt-2 space-y-1.5">
        <div className={`h-6 w-3/5 ${BLOCK}`} />
        <div className={`h-3 w-1/4 ${BLOCK}`} />
        <div className="grid grid-cols-1 @min-[15rem]:grid-cols-2 gap-1.5 pt-0.5">
          <div className={`h-8 ${BLOCK} rounded-lg`} />
          <div className={`h-8 ${BLOCK} rounded-lg`} />
        </div>
        <div className={`h-8 ${BLOCK} rounded-lg`} />
        <div className={`h-9 ${BLOCK} rounded-lg`} />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
