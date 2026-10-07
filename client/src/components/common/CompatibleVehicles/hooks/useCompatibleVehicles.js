import { useContext, useEffect, useState } from "react";

import LanguageContext from "../../../../context/LanguageContext";
import { fetchFilterCompatibility } from "../../../../services/vehicleService";
import {
  showsCompatibleVehicles,
  getCompatibleVehicleNames,
} from "../../../../utils/compatibleVehicles";

// یک درخواست برای همه‌ی کارت‌ها؛ فقط وقتی اولین کارتِ فیلتر نمایش داده بشه
// می‌ره و در صورت خطا دفعه‌ی بعد دوباره تلاش می‌شه
let cached = null;
let pending = null;

function loadCompatibility() {
  if (cached) return Promise.resolve(cached);

  if (!pending) {
    pending = fetchFilterCompatibility()
      .then((data) => {
        cached = data;

        return data;
      })
      .finally(() => {
        pending = null;
      });
  }

  return pending;
}

// نام خودروهای سازگار یک فیلتر + وضعیت جمع/باز بودن لیست.
// برای محصولات غیرفیلتر هیچ درخواستی نمی‌ره و لیست خالیه.
function useCompatibleVehicles(product, { limit, defaultOpen = false }) {
  const { language } = useContext(LanguageContext);
  const enabled = showsCompatibleVehicles(product);
  const sku = enabled ? String(product.sku).toUpperCase() : "";

  const [data, setData] = useState(cached);
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!enabled || data) return undefined;

    let active = true;

    loadCompatibility()
      .then((result) => active && setData(result))
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [enabled, data]);

  const names = data ? getCompatibleVehicleNames(data[sku], language) : [];
  const collapsible = names.length > limit;
  const visible = collapsible && !open ? names.slice(0, limit) : names;

  return {
    names,
    visible,
    hiddenCount: names.length - visible.length,
    collapsible,
    open,
    toggle: () => setOpen((value) => !value),
  };
}

export default useCompatibleVehicles;
