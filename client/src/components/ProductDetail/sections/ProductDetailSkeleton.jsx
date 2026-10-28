const BLOCK = "rounded-lg bg-gray-200 dark:bg-white/10";

// اسکلت صفحه‌ی محصول تا رسیدن لیست محصولات (همون چیدمان عکس + مشخصات)
function ProductDetailSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="max-w-7xl mx-auto px-5 py-10 animate-pulse motion-reduce:animate-none"
    >
      <div className={`h-6 w-24 ${BLOCK} mb-6`} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className={`h-90 ${BLOCK} rounded-3xl`} />

        <div className="space-y-4">
          <div className={`h-9 w-3/4 ${BLOCK}`} />
          <div className={`h-5 w-1/3 ${BLOCK}`} />
          <div className={`h-5 w-1/2 ${BLOCK}`} />
          <div className={`h-5 w-2/5 ${BLOCK}`} />
          <div className={`h-10 w-1/2 ${BLOCK} mt-8`} />
          <div className={`h-14 ${BLOCK} rounded-2xl mt-8`} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
