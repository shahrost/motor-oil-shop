import { useEffect } from "react";

// با فشردن Escape تابع onEscape صدا زده می‌شه
function useEscapeKey(onEscape) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onEscape();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEscape]);
}

export default useEscapeKey;
