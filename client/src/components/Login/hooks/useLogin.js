import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../services/authService";
import { saveAdminToken } from "../../../services/adminTokenStorage";

function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { token } = await loginAdmin({
        username: username.trim(),
        password,
      });

      saveAdminToken(token);

      navigate("/admin");
    } catch (error) {
      // پیام خود سرور (مثلاً رمز اشتباه)؛ اگه سرور جواب نداد، خطای ارتباط
      alert(
        error.response?.data?.message ||
          "ارتباط با سرور برقرار نشد؛ چند لحظه بعد دوباره امتحان کنید",
      );
    }
  }

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
  };
}

export default useLogin;
