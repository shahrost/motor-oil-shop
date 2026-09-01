function PromotionEdit({ editForm, handlePromotionChange }) {
  const promotion = editForm.promotion || {};

  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-4">طرح فروش</h3>

      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={promotion.isActive || false}
          onChange={(e) => handlePromotionChange("isActive", e.target.checked)}
        />
        این محصول طرح فروش دارد
      </label>

      {promotion.isActive && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">هر چند کارتن</label>

            <input
              type="text"
              inputMode="numeric"
              value={promotion.buyQty || ""}
              onChange={(e) =>
                handlePromotionChange(
                  "buyQty",
                  e.target.value.replace(/\D/g, ""),
                )
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">هدیه نقدی (کارتن)</label>

            <input
              type="text"
              inputMode="numeric"
              value={promotion.giftQtyCash || ""}
              onChange={(e) =>
                handlePromotionChange(
                  "giftQtyCash",
                  e.target.value.replace(/\D/g, ""),
                )
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              هدیه چکی/اعتباری (کارتن)
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={promotion.giftQtyCheck || ""}
              onChange={(e) =>
                handlePromotionChange(
                  "giftQtyCheck",
                  e.target.value.replace(/\D/g, ""),
                )
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-sm mb-1">
              توضیح تکمیلی طرح (اختیاری)
            </label>

            <input
              type="text"
              value={promotion.note || ""}
              onChange={(e) => handlePromotionChange("note", e.target.value)}
              placeholder="مثلاً: چک مدت‌دار نیز مشمول همین طرح است"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default PromotionEdit;
