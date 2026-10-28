import { useContext } from "react";
import { RotateCw, WifiOff } from "lucide-react";

import LanguageContext from "../../context/LanguageContext";
import { ProductContext } from "../../context";

// لیست محصولات (پایه‌ی صفحه‌ی اصلی، محصولات، صفحه‌ی محصول و سبد) از سرور نرسید:
// نوار زیر هدر با دکمه‌ی «تلاش دوباره»، به‌جای صفحه‌ی خالی بی‌توضیح
function ProductsLoadError() {
  const { t } = useContext(LanguageContext);
  const { loadError, retryProducts } = useContext(ProductContext);

  if (!loadError) return null;

  return (
    <div role="alert" className="bg-red-50 border-b border-red-200 px-5 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-center">
        <span className="flex items-center gap-2 font-bold text-red-700">
          <WifiOff /> {t("common.loadError")}
        </span>

        <button
          type="button"
          onClick={retryProducts}
          className="inline-flex items-center gap-2 bg-red-600 text-white rounded-xl px-4 py-2 font-bold text-sm"
        >
          <RotateCw size={16} /> {t("common.retry")}
        </button>
      </div>
    </div>
  );
}

export default ProductsLoadError;
