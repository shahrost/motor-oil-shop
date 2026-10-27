import { useEffect } from "react";

// تا locked درسته صفحه‌ی پشت (body) اسکرول نمی‌خوره؛ با false شدن یا unmount آزاد می‌شه
function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export default useBodyScrollLock;
