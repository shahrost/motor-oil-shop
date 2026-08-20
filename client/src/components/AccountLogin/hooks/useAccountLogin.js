import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import LanguageContext from "../../../context/LanguageContext";

function useAccountLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(CustomerAuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ phone, password });

      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || t("accountLogin.error"));
    } finally {
      setLoading(false);
    }
  }

  return {
    phone,
    setPhone,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  };
}

export default useAccountLogin;
