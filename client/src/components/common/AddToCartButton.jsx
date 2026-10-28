import { Check, ShoppingCart } from "lucide-react";

// دکمه‌ی یک‌خطی تمام‌عرض «افزودن به سبد»؛ کارت باریک (container کمتر از 11rem) فقط «افزودن» + آیکون.
// بعد از افزودن تا ۱٫۵ ثانیه سبز و «اضافه شد» (added از usePurchaseOptions). کارت محصول و نوار پایین صفحه‌ی محصول
function AddToCartButton({ added, onClick, t }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-9 flex items-center justify-center gap-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition ${
        added ? "bg-green-600 text-white" : "bg-yellow-400 hover:bg-yellow-500 text-gray-950"
      }`}
    >
      {added ? (
        <>
          <Check size={16} />
          <span role="status">{t("common.added")}</span>
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          <span className="@min-[11rem]:hidden">{t("common.add")}</span>
          <span className="hidden @min-[11rem]:inline">{t("common.addToCart")}</span>
        </>
      )}
    </button>
  );
}

export default AddToCartButton;
