import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { darkMode, setDarkMode } = useTheme();
    const { logout } = useAuth();

    return (
        <nav className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    S
                </div>
                <span className="font-bold text-lg dark:text-white hidden sm:block">SnippetGen</span>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-800" />
                <button 
                    onClick={logout}
                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-3 py-2 rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;