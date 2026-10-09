import useHeader from "./hooks/useHeader";
import {
  HeaderBrand,
  DesktopNav,
  HeaderActions,
  MobileMenu,
  OwnerPhotoModal,
} from "./sections";

function Header() {
  const { menuOpen, toggleMenu, closeMenu, photoOpen, openPhoto, closePhoto } =
    useHeader();

  return (
    <header className="bg-gray-950 sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-20 flex items-center justify-between">
          <HeaderBrand onPhotoClick={openPhoto} />

          <DesktopNav />

          <HeaderActions menuOpen={menuOpen} onToggleMenu={toggleMenu} />
        </div>

        {menuOpen && <MobileMenu onClose={closeMenu} />}
      </div>

      {photoOpen && <OwnerPhotoModal onClose={closePhoto} />}
    </header>
  );
}

export default Header;
