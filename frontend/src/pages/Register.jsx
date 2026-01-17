// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Added Toaster import
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const Register = ({ setIsAuthenticated }) => {
    // Backend expects 'username', not 'name'
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, formData);
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.user.username);
            
            if (typeof setIsAuthenticated === 'function') {
                setIsAuthenticated(true);
            }
    
            toast.success(`Welcome to SnippetGen, ${res.data.user.username}!`);
            navigate('/dashboard'); 
        } catch (err) {
            toast.error(err.response?.data?.msg || "Registration failed. Try a different email.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <Toaster position="top-center" />
            <form onSubmit={handleRegister} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 w-full max-w-md shadow-2xl">
                <h2 className="text-3xl font-black text-white mb-2 text-center">Join SnippetGen</h2>
                <p className="text-slate-400 text-sm mb-8 text-center">Start managing your code like a pro</p>
                
                <div className="space-y-4">
                    <input 
                        type="text" placeholder="Username" required
                        className="w-full p-4 bg-slate-800 rounded-xl text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                    <input 
                        type="email" placeholder="Email Address" required
                        className="w-full p-4 bg-slate-800 rounded-xl text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <input 
                        type="password" placeholder="Create Password" required
                        className="w-full p-4 bg-slate-800 rounded-xl text-white outline-none border border-slate-700 focus:border-blue-500 transition-all"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 mt-8 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                    Create Account
                </button>
                
                <p className="text-center text-slate-500 text-sm mt-6">
                    Already have an account? <button type="button" onClick={() => navigate('/login')} className="text-blue-400 font-bold hover:underline">Login</button>
                </p>
            </form>
        </div>
    );
};

export default Register;