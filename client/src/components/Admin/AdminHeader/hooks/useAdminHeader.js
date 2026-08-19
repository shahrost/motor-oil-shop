import { useNavigate } from "react-router-dom";

function useAdminHeader() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return {
    logout,
  };
}

export default useAdminHeader;
