// فیلدهای طرح فروش — مشترک بین فرم افزودن و ویرایش محصول
import usePromotionFields from "./hooks/usePromotionFields";
import { NumberInput } from "./sections";

function PromotionFields({ promotion = {}, onChange }) {
  const { update, buyQtyCash, buyQtyCheck } = usePromotionFields(
    promotion,
    onChange,
  );

  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-4">طرح فروش</h3>

      <label className="flex items-center gap-3 mb-3">
        <input
          type="checkbox"
          checked={promotion.isActive || false}
          onChange={(e) => update("isActive", e.target.checked)}
        />
        این محصول طرح فروش دارد
      </label>

      {promotion.isActive && (
        <div className="grid grid-cols-2 gap-3">
          <NumberInput
            label="نقدی: هر چند کارتن"
            value={buyQtyCash}
            onChange={(v) => update("buyQtyCash", v)}
          />
          <NumberInput
            label="نقدی: چند کارتن هدیه"
            value={promotion.giftQtyCash}
            onChange={(v) => update("giftQtyCash", v)}
          />

          <NumberInput
            label="چکی/اعتباری: هر چند کارتن"
            value={buyQtyCheck}
            onChange={(v) => update("buyQtyCheck", v)}
          />
          <NumberInput
            label="چکی/اعتباری: چند کارتن هدیه"
            value={promotion.giftQtyCheck}
            onChange={(v) => update("giftQtyCheck", v)}
          />

          <NumberInput
            label="حداقل سفارش (کارتن، اختیاری)"
            value={promotion.minQty}
            onChange={(v) => update("minQty", v)}
          />

          <div className="col-span-2">
            <label className="block text-sm mb-1">
              توضیح تکمیلی طرح (اختیاری)
            </label>

            <input
              type="text"
              value={promotion.note || ""}
              onChange={(e) => update("note", e.target.value)}
              placeholder="مثلاً: چک مدت‌دار نیز مشمول همین طرح است"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default PromotionFields;
