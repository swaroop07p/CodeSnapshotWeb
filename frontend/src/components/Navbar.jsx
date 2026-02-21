import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, LogOut, Terminal } from "lucide-react";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  // Use the logout function from your AuthContext if it exists
  const { logout } = useAuth();

  // This handles the persistent session cleanup
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // If your AuthContext has a logout function, call it to clear global state
    if (logout) logout();

    // Redirect to login page to ensure a clean state
    window.location.href = "/login";
  };

  const handleReset = () => {
    window.location.href = "/dashboard";
  };

  return (
    <nav className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50 transition-colors">
      {/* Clickable Logo */}
      <div
        onClick={handleReset}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Terminal size={18} />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ">
          SnippetGen
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-800" />

        {/* Updated Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-3 py-2 rounded-lg transition-all active:scale-95"
        >
          <LogOut size={18} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
