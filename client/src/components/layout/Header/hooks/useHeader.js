import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import useBodyScrollLock from "../../../../hooks/useBodyScrollLock";

// باز/بسته بودن منوی موبایل و مودال عکس.
// منو به آدرسی که روش باز شده بسته‌ست: با هر تغییر مسیر (حتی Back) خودش بسته می‌شه؛
// تا بازه صفحه‌ی پشتش اسکرول نمی‌خوره
function useHeader() {
  const { pathname } = useLocation();
  const [menuPath, setMenuPath] = useState(null);
  const [photoOpen, setPhotoOpen] = useState(false);

  const menuOpen = menuPath === pathname;
  useBodyScrollLock(menuOpen);

  return {
    menuOpen,
    toggleMenu: useCallback(
      () => setMenuPath((path) => (path === pathname ? null : pathname)),
      [pathname],
    ),
    closeMenu: useCallback(() => setMenuPath(null), []),
    photoOpen,
    openPhoto: useCallback(() => setPhotoOpen(true), []),
    closePhoto: useCallback(() => setPhotoOpen(false), []),
  };
}

export default useHeader;
