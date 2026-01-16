import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 1. ADD THIS STATE TO FIX THE "setError" ERROR
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('username', res.data.user.username);
      navigate("/dashboard");
      // Inside handleSubmit in Auth.jsx
    } catch (err) {
      // This line fetches the EXACT message we wrote in the backend
      const backendMessage =
        err.response?.data?.msg || "Something went wrong. Please try again.";
      setError(backendMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
          {isLogin ? "Welcome Back" : "Join the Community"}
        </h2>

        {/* 3. DISPLAY THE FRIENDLY ERROR MESSAGE HERE */}
        {error && (
          <div className="mb-4 p-3 text-sm bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-blue-500 transition-all"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-blue-500 transition-all"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 ring-blue-500 transition-all"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600 dark:text-slate-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // This clears the error when they switch modes
            }}
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
