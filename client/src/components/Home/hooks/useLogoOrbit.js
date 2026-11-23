import { useLayoutEffect, useRef } from "react";

import { prefersReducedMotion } from "../helpers/animate";
import { createLogoOrbit } from "../helpers/logoOrbitScenario";

// لوگوهای چرخان دور تصویر وسط کارت (سناریو در helpers/logoOrbitScenario).
// ref رو به باکس تصویر بدید؛ لوگوها قبل از اولین نمایش روی مدار قرار می‌گیرن.
// ellipse: شکل مدار از helpers/logoOrbit
function useLogoOrbit(brands, ellipse) {
  const artRef = useRef(null);

  useLayoutEffect(() => {
    const art = artRef.current;
    if (!art) return;

    const orbit = createLogoOrbit(art, brands, ellipse);

    if (prefersReducedMotion()) {
      orbit.showFinalState();
    } else {
      orbit.run();
    }

    // اندازه‌ی کارت عوض شد ← لوگوها روی بیضی جدید
    window.addEventListener("resize", orbit.layout);

    return () => {
      window.removeEventListener("resize", orbit.layout);
      orbit.destroy();
    };
  }, [brands, ellipse]);

  return artRef;
}

export default useLogoOrbit;
