import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="mx-4 sm:mx-auto sm:max-w-md mt-20 mb-20 p-6 bg-slate-300 rounded-lg shadow-md">
      <h2 className="text-teal-900 text-lg md:text-2xl font-semibold mb-6 text-center">
        Login
      </h2>
      {error && (
        <p className="text-red-600 text-sm p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring focus:ring-blue-600"
            required
          />
        </div>
        <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-900">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-800 hover:underline" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
