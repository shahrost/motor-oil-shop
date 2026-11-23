import { useEffect, useState } from "react";

import {
  getCachedCompatibility,
  loadCompatibility,
} from "../services/filterCompatibilityCache";

// دادهٔ خودروهای سازگار فیلترها؛ فقط وقتی enabled است و هنوز نیامده، یک بار گرفته می‌شه
// (درخواست مشترک و کش‌شده‌ی همه‌ی کارت‌ها و جستجو). تا رسیدن داده null است.
function useFilterCompatibility(enabled) {
  const [data, setData] = useState(getCachedCompatibility);

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

  return data;
}

export default useFilterCompatibility;
