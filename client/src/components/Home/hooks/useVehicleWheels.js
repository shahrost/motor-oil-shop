import { useEffect, useRef } from "react";

import { isFrozen, prefersReducedMotion } from "../helpers/animate";

// هر دور چهار ثانیه، مانند چرخ‌دندهٔ روغن؛ تمام اجزای هر چرخ یکپارچه می‌چرخند.
function useVehicleWheels() {
  const wheelsRef = useRef(null);

  useEffect(() => {
    const root = wheelsRef.current;
    if (!root || prefersReducedMotion()) return;

    const animations = [...root.querySelectorAll('[data-vehicle="wheel-rotor"]')].map(wheel => {
      wheel.style.transformBox = "fill-box";
      wheel.style.transformOrigin = "center";
      const animation = wheel.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        { duration: 4000, iterations: Infinity, easing: "linear" },
      );
      animation.pause();
      return animation;
    });
    const treads = root.querySelector('[data-vehicle="treads"]');
    const chain = treads?.animate(
      [{ strokeDashoffset: 0 }, { strokeDashoffset: -12 }],
      { duration: 48000 / (2 * Math.PI * 21), iterations: Infinity, easing: "linear" },
    );
    chain?.pause();
    const movingParts = chain ? [...animations, chain] : animations;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFrozen(root)) {
        const time = animations[0].currentTime || 0;
        movingParts.forEach(animation => {
          animation.currentTime = time;
          animation.play();
        });
      } else {
        movingParts.forEach(animation => animation.pause());
      }
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      movingParts.forEach(animation => animation.cancel());
    };
  }, []);

  return wheelsRef;
}

export default useVehicleWheels;
