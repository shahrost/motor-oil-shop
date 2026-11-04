import { Gift } from "lucide-react";

import { getPromotionRuleLines } from "../../../utils/promotionCalc";
import ProductCard from "../../ProductCard";

// یک محصول طرح‌دار: شرایط طرح بالای کارت خرید. هدیه فقط برای سفارش کارتنیه، پس واحد پیش‌فرض کارتن
function PromotionProduct({ product, t }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-2.5 space-y-1">
        {getPromotionRuleLines(product.promotion, t).map((line) => (
          <p key={line} className="text-amber-800 font-bold text-xs flex items-start gap-1">
            <Gift size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
            {line}
          </p>
        ))}

        {product.promotion?.note && (
          <p className="text-[11px] text-amber-700">{product.promotion.note}</p>
        )}
      </div>

      <div className="flex-1">
        <ProductCard product={product} defaultOrderType="carton" />
      </div>
    </div>
  );
}

export default PromotionProduct;
