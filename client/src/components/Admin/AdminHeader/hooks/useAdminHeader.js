import { useNavigate } from "react-router-dom";
import { clearAdminToken } from "../../../../services/adminTokenStorage";

function useAdminHeader() {
  const navigate = useNavigate();

  function logout() {
    clearAdminToken();
    navigate("/login");
  }

  return {
    logout,
  };
}

export default useAdminHeader;
