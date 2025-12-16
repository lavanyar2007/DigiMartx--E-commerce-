import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful!",{ autoClose: 250});
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Registration failed",{ autoClose: 250});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-indigo-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-indigo-900 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded mb-4"
        />

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
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-900 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
