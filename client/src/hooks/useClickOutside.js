import { useEffect } from "react";

// وقتی active است، کلیک/لمس بیرون از rootRef تابع onOutside رو صدا می‌زنه (بستن منوها)
function useClickOutside(rootRef, active, onOutside) {
  useEffect(() => {
    if (!active) return undefined;

    function handlePointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) onOutside();
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [rootRef, active, onOutside]);
}

export default useClickOutside;
