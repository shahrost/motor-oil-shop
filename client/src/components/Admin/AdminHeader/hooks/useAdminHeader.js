import { useLocation, useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../../../services/adminTokenStorage";

const PAGE_TITLES = {
  "/admin/orders": "مدیریت سفارشات",
};
const DEFAULT_TITLE = "پنل مدیریت محصولات";

function useAdminHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function logout() {
    clearAdminToken();
    navigate("/login");
  }

  return {
    title: PAGE_TITLES[pathname] || DEFAULT_TITLE,
    logout,
  };
}

export default useAdminHeader;
