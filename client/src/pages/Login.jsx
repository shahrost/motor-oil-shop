import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

function Login() {
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

      localStorage.setItem("token", response.data.token);

      navigate("/admin");
    } catch (error) {
      alert("نام کاربری یا رمز اشتباه است");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-[350px]"
      >
        <h1 className="text-2xl font-bold text-center mb-6">ورود ادمین</h1>

        <input
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg w-full mb-4"
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-3 rounded-lg">
          ورود
        </button>
      </form>
    </div>
  );
}

export default Login;
