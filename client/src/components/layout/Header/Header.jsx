import { useCallback, useContext, useState } from "react";

import LanguageContext from "../../../context/LanguageContext";
import {
  HeaderBrand,
  DesktopNav,
  HeaderActions,
  MobileMenu,
  OwnerPhotoModal,
} from "./sections";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  const { language, t } = useContext(LanguageContext);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closePhoto = useCallback(() => setPhotoOpen(false), []);

  return (
    <header className="bg-gray-950 sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-20 flex items-center justify-between">
          <HeaderBrand t={t} onPhotoClick={() => setPhotoOpen(true)} />

          <DesktopNav t={t} language={language} />

          <HeaderActions
            t={t}
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((open) => !open)}
          />
        </div>

        {menuOpen && <MobileMenu t={t} language={language} onClose={closeMenu} />}
      </div>

      {photoOpen && <OwnerPhotoModal t={t} onClose={closePhoto} />}
    </header>
  );
}

export default Header;
