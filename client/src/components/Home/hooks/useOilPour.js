import { useEffect, useRef } from "react";

import createGearDrive from "../helpers/gearDrive";
import { prefersReducedMotion, onceVisible } from "../helpers/animate";
import {
  collectOilParts,
  runOilPour,
  showOilFinalState,
  resetOilPour,
} from "../helpers/oilPourScenario";

// انیمیشن کارت «روانکار» (سناریو در helpers/oilPourScenario).
// فقط یک بار، وقتی کارت برای اولین بار دیده بشه.
function useOilPour() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const el = collectOilParts(card);
    if (!el) return;

    const drive = createGearDrive({
      gearRotor: el.gearRotor,
      gearBody: el.gearBody,
      wheels: el.wheels,
      treads: el.treads,
    });

    if (prefersReducedMotion()) {
      showOilFinalState(el);
      return () => drive.stop();
    }

    let cancelled = false;
    const stopWatching = onceVisible(card, () => runOilPour(el, drive, () => !cancelled));

    return () => {
      cancelled = true;
      stopWatching();
      drive.stop();
      resetOilPour(el);
    };
  }, []);

  return cardRef;
}

export default useOilPour;
