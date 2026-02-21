// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Added Toaster import
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);

      // Backend returns 'username', not 'name'
      const user = res.data.user;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", user.username);

      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.username}!`);
    } catch (err) {
      // Check for the specific friendly message from backend
      const backendMsg = err.response?.data?.msg;
      if (backendMsg) {
        toast.error(backendMsg);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
      console.log("Login Error Details:", err.response?.data);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      {/* THIS COMPONENT MAKES THE MESSAGES VISIBLE ON SCREEN */}
      <Toaster position="top-center" reverseOrder={false} />

      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-96 shadow-2xl relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login to SnippetGen
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 bg-slate-800 rounded-lg text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 mb-2 bg-slate-800 rounded-lg text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Enter Dashboard
        </button>

        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-400 font-bold hover:underline ml-1"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
