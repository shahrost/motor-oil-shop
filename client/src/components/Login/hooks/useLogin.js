import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient";

function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await apiClient.post("/auth/login", {
        username,
        password,
      });

      const token = response.data.data.token;

      localStorage.setItem("token", token);

      navigate("/admin");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("نام کاربری یا رمز اشتباه است");
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
