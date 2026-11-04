import { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductContext } from "../../../context";
import { PROMOTION_GROUPS } from "../data/promotionGroups";
import buildPromotionGroups from "../helpers/buildPromotionGroups";

// کارت‌های طرح فروش و کارت بازشده. کارت باز در آدرس (?group=) می‌مونه تا دکمه‌ی برگشت
// مرورگر کار کنه و بشه لینک یک گروه رو مستقیم فرستاد
function usePromotionGroups() {
  const { products, loading } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group");

  const groups = useMemo(() => buildPromotionGroups(products, PROMOTION_GROUPS), [products]);

  const selectedGroup = groups.find((group) => group.id === groupId) || null;

  // جابه‌جایی بین فهرست و کارت باز آدرس صفحه رو عوض نمی‌کنه، پس اسکرول خودکار بالا نمی‌ره
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [groupId]);

  return {
    groups,
    selectedGroup,
    loading: loading && products.length === 0,
  };
}

export default usePromotionGroups;
