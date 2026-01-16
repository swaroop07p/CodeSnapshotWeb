import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            
            // --- FIX FOR UNDEFINED NAME ---
            // We check both res.data.user.name and res.data.name as fallbacks
            const userData = res.data.user || res.data;
            const userName = userData.name || "Developer"; 
            const token = res.data.token;

            if (token) {
                // KEY: Save to localStorage for persistence
                localStorage.setItem('token', token);
                localStorage.setItem('username', userName);
                
                // KEY: Update state to trigger redirect in App.jsx
                setIsAuthenticated(true);
                
                // Use the extracted variable to avoid 'undefined' in the toast
                toast.success(`Welcome back, ${userName}!`);
            } else {
                toast.error("Login successful but no token received.");
            }
        } catch (err) {
            console.error("Login Error Details:", err.response?.data);
            toast.error(err.response?.data?.msg || "Login Failed. Check console for details.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-96 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome Back</h2>
                <p className="text-slate-400 text-sm mb-6 text-center">Login to your SnippetGen account</p>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="developer@example.com" 
                            required
                            className="w-full p-3 bg-slate-800 rounded-xl text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required
                            className="w-full p-3 mb-2 bg-slate-800 rounded-xl text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 mt-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    Enter Dashboard
                </button>
            </form>
        </div>
    );
};

export default Login;