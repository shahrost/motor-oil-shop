import { useEffect, useRef } from "react";

import homeOrbitBrands from "../../../data/homeOrbitBrands";
import { prefersReducedMotion, onceVisible } from "../helpers/animate";
import { createLogoOrbit } from "../helpers/logoOrbitScenario";

// انیمیشن کارت «خودروهای من» (سناریو در helpers/logoOrbitScenario).
// ref رو به باکس تصویر (دور ماشین) بدید. فقط یک بار، وقتی کارت برای اولین بار دیده بشه.
function useLogoOrbit() {
  const artRef = useRef(null);

  useEffect(() => {
    const art = artRef.current;
    if (!art) return;

    const orbit = createLogoOrbit(art, homeOrbitBrands);

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
  }, []);

  return artRef;
}

export default useLogoOrbit;
