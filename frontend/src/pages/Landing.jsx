import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                SnippetGen
            </h1>
            <p className="text-slate-400 max-w-md mb-8">
                The ultimate AI-powered workspace to beautify, explain, and manage your code snippets.
            </p>
            <button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20"
            >
                Get Started
            </button>
        </div>
    );
};

export default Landing;