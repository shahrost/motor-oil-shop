import PromotionFields from "../../common/PromotionFields";

function PromotionSection({ product, updatePromotionField }) {
  return (
    <PromotionFields
      promotion={product.promotion}
      onChange={updatePromotionField}
    />
  );
}

export default PromotionSection;
