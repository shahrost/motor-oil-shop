import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerAuthContext from "../../../context/CustomerAuthContext";
import LanguageContext from "../../../context/LanguageContext";

function useRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(CustomerAuthContext);
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ name, phone, password });

      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || t("register.error"));
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    error,
    loading,
    handleRegister,
  };
}

export default useRegister;
