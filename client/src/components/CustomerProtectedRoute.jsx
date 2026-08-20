import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CustomerAuthContext from "../context/CustomerAuthContext";

function CustomerProtectedRoute({ children }) {
  const { customer, loading } = useContext(CustomerAuthContext);

  if (loading) {
    return null;
  }

  if (!customer) {
    return <Navigate to="/account-login" replace />;
  }

  return children;
}

export default CustomerProtectedRoute;
