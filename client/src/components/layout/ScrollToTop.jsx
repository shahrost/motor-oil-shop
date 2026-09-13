import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the browser's current scroll position across route
// changes, so navigating from a scrolled-down list page (e.g. clicking a
// product card near the bottom of the grid) landed the next page already
// scrolled down instead of at the top.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
