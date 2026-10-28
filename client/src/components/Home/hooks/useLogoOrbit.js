import { useEffect, useRef } from "react";

import { prefersReducedMotion, onceVisible } from "../helpers/animate";
import { createLogoOrbit } from "../helpers/logoOrbitScenario";

// لوگوهای چرخان دور تصویر وسط کارت (سناریو در helpers/logoOrbitScenario).
// ref رو به باکس تصویر بدید. فقط یک بار، وقتی کارت برای اولین بار دیده بشه.
// ellipse: شکل مدار از helpers/logoOrbit؛ media: فقط وقتی این media query برقراره
// (مثلاً قطره‌ی «روانکار» روی موبایل گوشه‌ی کارت و کوچیکه و جای مدار نداره)
function useLogoOrbit(brands, ellipse, media) {
  const artRef = useRef(null);

  useEffect(() => {
    const art = artRef.current;
    if (!art || (media && !window.matchMedia(media).matches)) return;

    const orbit = createLogoOrbit(art, brands, ellipse);

    let stopWatching = null;
    if (prefersReducedMotion()) {
      orbit.showFinalState();
    } else {
      stopWatching = onceVisible(art, orbit.run);
    }

    // اندازه‌ی کارت عوض شد ← لوگوها روی بیضی جدید
    window.addEventListener("resize", orbit.layout);

    return () => {
      stopWatching?.();
      window.removeEventListener("resize", orbit.layout);
      orbit.destroy();
    };
  }, [brands, ellipse, media]);

  return artRef;
}

export default useLogoOrbit;
