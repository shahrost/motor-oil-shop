import PromotionFields from "../../common/PromotionFields";

function PromotionEdit({ editForm, handlePromotionChange }) {
  return (
    <PromotionFields
      promotion={editForm.promotion}
      onChange={handlePromotionChange}
    />
  );
}

export default PromotionEdit;
