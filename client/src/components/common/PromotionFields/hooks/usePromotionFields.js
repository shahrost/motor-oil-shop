const NUMERIC_FIELDS = [
  "buyQtyCash",
  "giftQtyCash",
  "buyQtyCheck",
  "giftQtyCheck",
  "minQty",
];

// فیلدهای عددی فقط رقم نگه می‌دارن؛ طرح‌های قدیمی فقط buyQty مشترک دارند
function usePromotionFields(promotion, onChange) {
  function update(field, value) {
    onChange(
      field,
      NUMERIC_FIELDS.includes(field) ? String(value).replace(/\D/g, "") : value,
    );
  }

  return {
    update,
    buyQtyCash: promotion.buyQtyCash || promotion.buyQty,
    buyQtyCheck: promotion.buyQtyCheck || promotion.buyQty,
  };
}

export default usePromotionFields;
