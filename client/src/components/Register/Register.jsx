import { useContext } from "react";
import { Link } from "react-router-dom";
import useRegister from "./hooks/useRegister";
import LanguageContext from "../../context/LanguageContext";

function Register() {
  const { t } = useContext(LanguageContext);
  const {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    error,
    loading,
    handleRegister,
  } = useRegister();

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow p-8 my-10">
      <h1 className="text-2xl font-extrabold text-center mb-6">
        {t("register.title")}
      </h1>

      <form onSubmit={handleRegister}>
        <input
          className="border p-3 rounded-xl w-full mb-4"
          placeholder={t("common.fullNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-3 rounded-xl w-full mb-4"
          placeholder={t("common.phonePlaceholder")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          className="border p-3 rounded-xl w-full mb-4"
          placeholder={t("common.passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 text-black w-full py-3 rounded-xl font-bold disabled:opacity-60"
        >
          {loading ? t("register.submitting") : t("header.register")}
        </button>
      </form>

      <p className="text-center text-sm mt-5 text-gray-600">
        {t("register.hasAccount")}{" "}
        <Link to="/account-login" className="text-green-700 font-bold">
          {t("accountLogin.submit")}
        </Link>
      </p>
    </div>
  );
}

export default Register;
