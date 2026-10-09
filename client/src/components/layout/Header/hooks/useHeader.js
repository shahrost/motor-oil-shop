import { useCallback, useState } from "react";

// باز/بسته بودن منوی موبایل و مودال عکس
function useHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  return {
    menuOpen,
    toggleMenu: useCallback(() => setMenuOpen((open) => !open), []),
    closeMenu: useCallback(() => setMenuOpen(false), []),
    photoOpen,
    openPhoto: useCallback(() => setPhotoOpen(true), []),
    closePhoto: useCallback(() => setPhotoOpen(false), []),
  };
}

export default useHeader;
