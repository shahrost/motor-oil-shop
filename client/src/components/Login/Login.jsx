import useLogin from "./hooks/useLogin";

function Login() {
  const { username, password, setUsername, setPassword, handleLogin } =
    useLogin();

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>ورود ادمین</h1>

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

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded-lg"
        >
          ورود
        </button>
      </form>
    </div>
  );
}

export default Login;
