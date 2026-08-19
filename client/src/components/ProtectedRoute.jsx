import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../services/authService";

function ProtectedRoute({ children }) {
  const hasToken = Boolean(localStorage.getItem("token"));
  const [status, setStatus] = useState(hasToken ? "checking" : "unauthorized");

  useEffect(() => {
    if (!hasToken) return;

    verifyToken()
      .then(() => setStatus("authorized"))
      .catch(() => {
        localStorage.removeItem("token");
        setStatus("unauthorized");
      });
  }, [hasToken]);

  if (status === "checking") {
    return null;
  }

  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
