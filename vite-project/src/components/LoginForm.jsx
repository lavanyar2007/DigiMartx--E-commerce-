import { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (username === "user" && password === "user123") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", "user");
      navigate("/home");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center">Login</h1>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-indigo-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
