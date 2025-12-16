import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState(""); // email instead of username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      const { token, role } = res.data;

      // Save JWT token & role
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("isLoggedIn", "true");

      toast.success("Login successful!",{ autoClose: 250});
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login failed",{ autoClose: 250});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-indigo-900 text-white py-2 rounded hover:bg-indigo-800"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-900 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
