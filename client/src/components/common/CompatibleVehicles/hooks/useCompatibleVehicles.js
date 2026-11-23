import { useContext, useState } from "react";

import LanguageContext from "../../../../context/LanguageContext";
import useFilterCompatibility from "../../../../hooks/useFilterCompatibility";
import {
  showsCompatibleVehicles,
  getCompatibleVehicleNames,
} from "../../../../utils/compatibleVehicles";

// نام خودروهای سازگار یک فیلتر + وضعیت جمع/باز بودن لیست.
// برای محصولات غیرفیلتر هیچ درخواستی نمی‌ره و لیست خالیه.
function useCompatibleVehicles(product, { limit, defaultOpen = false }) {
  const { language } = useContext(LanguageContext);
  const enabled = showsCompatibleVehicles(product);
  const sku = enabled ? String(product.sku).toUpperCase() : "";

  const data = useFilterCompatibility(enabled);
  const [open, setOpen] = useState(defaultOpen);

  const names = data ? getCompatibleVehicleNames(data[sku], language) : [];
  const collapsible = names.length > limit;
  const visible = collapsible && !open ? names.slice(0, limit) : names;

  return {
    names,
    text: visible.join(language === "en" ? ", " : "، "),
    hiddenCount: names.length - visible.length,
    collapsible,
    open,
    toggle: () => setOpen((value) => !value),
  };
}

export default useCompatibleVehicles;
