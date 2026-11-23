import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CustomerAuthContext from "../context/CustomerAuthContext";
import LanguageContext from "../context/LanguageContext";

function CustomerProtectedRoute({ children }) {
  const { customer, loading, loadError, retryProfile } = useContext(CustomerAuthContext);
  const { t } = useContext(LanguageContext);

  if (loading) {
    return null;
  }

  if (!customer) {
    if (loadError) return (
      <div role="alert" className="mx-auto my-10 max-w-xl rounded-xl bg-red-50 p-6 text-center">
        <p>{t("common.loadError")}</p>
        <button type="button" onClick={retryProfile} className="mt-4 min-h-11 rounded-lg bg-yellow-400 px-5 font-bold text-gray-950">
          {t("common.retry")}
        </button>
      </div>
    );
    return <Navigate to="/account-login" replace />;
  }

  return children;
}

export default CustomerProtectedRoute;
