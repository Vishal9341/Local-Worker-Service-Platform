import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token/user to context and redirect
      login(data);
      if (data.role === 'worker') {
        navigate("/worker");
      } else if (data.role === 'admin') {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard"); 
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end text-sm">
            <Link
              to="/Forget"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;