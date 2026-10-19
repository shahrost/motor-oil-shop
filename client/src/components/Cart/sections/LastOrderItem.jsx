import { useContext } from "react";
import formatPrice from "../../../utils/formatPrice";
import getBrandLabel from "../../../utils/brandLabel";
import { getProductNameLabel } from "../../../utils/productNameLabel";
import { formatVolume } from "../../../utils/formatVolume";
import LanguageContext from "../../../context/LanguageContext";
import GiftBadge from "../../common/GiftBadge";

// یک قلم از آخرین سفارش ثبت‌شده (فقط نمایشی)
function LastOrderItem({ item }) {
  const { language, t } = useContext(LanguageContext);

  const unitCount = Number(item.totalCount || item.quantity || 0);
  const price = Number(item.price || 0);

  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50">
      <h4 className="font-extrabold text-black">
        {getProductNameLabel(item.productName, language)}
      </h4>

      <p className="text-sm text-gray-600 mt-1">
        {getBrandLabel(item.brand, language)}
        {item.viscosity ? ` · ${item.viscosity}` : ""}
        {item.volume ? ` · ${formatVolume(item.volume, language)}` : ""}
      </p>

      <p className="text-sm text-gray-700 mt-2">
        {item.quantity} {t(`common.orderUnit.${item.orderType || "number"}`)} ·{" "}
        {t(`common.paymentType.${item.paymentType || "cash"}`)}
      </p>

      <div className="mt-3 text-sm flex items-center justify-between gap-3">
        <span className="text-gray-600">{t("order.lastOrder.unitPrice")}</span>
        <span className="font-bold text-gray-800">{formatPrice(price, language)}</span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-bold text-gray-600">
          {t("order.lastOrder.lineTotal")} ({unitCount} {t("common.orderUnit.number")})
        </span>
        <span className="font-extrabold text-gray-950">
          {formatPrice(price * unitCount, language)}
        </span>
      </div>

      <GiftBadge giftQty={item.giftQty} className="mt-3 rounded-xl p-2 text-sm" />
    </div>
  );
}

export default LastOrderItem;
