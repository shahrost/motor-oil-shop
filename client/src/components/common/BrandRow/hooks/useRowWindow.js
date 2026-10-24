import { useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { getScrollMemory, scrollMemoryKey } from "../../../../services/scrollMemoryStorage";

// صفحه‌ی محصولات بیش از هزار کارت داره و رندر یک‌جای همه‌شون روی گوشی چند ثانیه
// صفحه رو قفل می‌کرد. هر ردیف اول چند کارت نشون می‌ده و با اسکرول افقی بقیه اضافه می‌شن.
const INITIAL_COUNT = 8;
const STEP = 8;

// با Back باید کارت کلیک‌شده و جای اسکرول افقی ردیف برگرده؛ پس اون ردیف کامل رندر می‌شه
function initialCount(items, rowName, saved) {
  if (!saved) return INITIAL_COUNT;

  const scrolled = Math.abs(saved.rows?.[rowName] || 0) > 0;
  const hasClicked = saved.productId && items.some((item) => item.id === saved.productId);

  return scrolled || hasClicked ? items.length : INITIAL_COUNT;
}

function useRowWindow(items, rowName) {
  const location = useLocation();
  const navigationType = useNavigationType();

  const [count, setCount] = useState(() =>
    initialCount(
      items,
      rowName,
      navigationType === "POP" ? getScrollMemory(scrollMemoryKey(location)) : null,
    ),
  );

  // در RTL مقدار scrollLeft منفیه؛ نزدیک ته ردیف (کمتر از یک عرض) کارت‌های بعدی اضافه می‌شن
  const onScroll = (event) => {
    if (count >= items.length) return;

    const row = event.currentTarget;
    const remaining = row.scrollWidth - row.clientWidth - Math.abs(row.scrollLeft);

    if (remaining < row.clientWidth) setCount((value) => value + STEP);
  };

  return { visibleItems: items.slice(0, count), onScroll };
}

export default useRowWindow;
