// نرمال‌سازی طرح فروش قبل از ذخیره (فرم افزودن و ویرایش محصول)
function buildPromotionData(promotion = {}) {
  const buyQtyCash = Number(promotion.buyQtyCash || promotion.buyQty || 0);
  const buyQtyCheck = Number(promotion.buyQtyCheck || promotion.buyQty || 0);

  return {
    isActive: Boolean(promotion.isActive),
    buyQty: buyQtyCash || buyQtyCheck,
    buyQtyCash,
    buyQtyCheck,
    giftQtyCash: Number(promotion.giftQtyCash || 0),
    giftQtyCheck: Number(promotion.giftQtyCheck || 0),
    minQty: Number(promotion.minQty || 0),
    note: promotion.note || "",
  };
}

export default buildPromotionData;
