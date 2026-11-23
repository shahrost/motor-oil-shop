import { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerAuthContext from "../../../../context/CustomerAuthContext";
import useClickOutside from "../../../../hooks/useClickOutside";
import useEscapeKey from "../../../../hooks/useEscapeKey";

// منوی پروفایل مشتری: باز/بسته (کلیک بیرون و Escape می‌بندن)، نمایش شماره‌ی پشتیبانی، خروج
function useAccountMenu() {
  const { logout } = useContext(CustomerAuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const rootRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setShowSupport(false);
  }, []);

  useEscapeKey(close);

  useClickOutside(rootRef, open, close);

  function toggle() {
    if (open) close();
    else setOpen(true);
  }

  function handleLogout() {
    close();
    logout();
    navigate("/");
  }

  return {
    rootRef,
    open,
    toggle,
    close,
    showSupport,
    toggleSupport: () => setShowSupport((value) => !value),
    handleLogout,
  };
}

export default useAccountMenu;
