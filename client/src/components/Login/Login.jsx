import useLogin from "./hooks/useLogin";

function Login() {
  const { username, password, setUsername, setPassword, handleLogin } =
    useLogin();

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>ورود ادمین</h1>

        <label htmlFor="admin-username" className="sr-only">
          نام کاربری
        </label>
        <input
          id="admin-username"
          autoComplete="username"
          required
          className="border p-3 rounded-lg w-full mb-4"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="admin-password" className="sr-only">
          رمز عبور
        </label>
        <input
          id="admin-password"
          autoComplete="current-password"
          required
          className="border p-3 rounded-lg w-full mb-4"
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-yellow-400 text-gray-950 w-full py-3 rounded-lg"
        >
          ورود
        </button>
      </form>
    </div>
  );
}

export default Login;
