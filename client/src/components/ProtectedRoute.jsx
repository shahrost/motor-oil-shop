import { Navigate } from "react-router-dom";
import useAdminAuthCheck from "../hooks/useAdminAuthCheck";

function ProtectedRoute({ children }) {
  const status = useAdminAuthCheck();

  if (status === "checking") {
    return null;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
