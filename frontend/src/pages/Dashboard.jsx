import React, { useState, useEffect } from 'react';
import RecentHistory from '../components/RecentHistory';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [username, setUsername] = useState("Developer");

    useEffect(() => {
        // Retrieve username from localStorage (set during Auth)
        const savedUser = localStorage.getItem('username');
        if (savedUser) setUsername(savedUser);
    }, []);

    const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
            <Navbar />
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                <aside className="w-full md:w-80 border-r dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto">
                    <RecentHistory 
                        refreshTrigger={refreshTrigger} 
                        onSelectSnippet={(snippet) => setSelectedSnippet(snippet)} 
                    />
                </aside>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Friendly Greeting Message */}
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                                Happy Coding, <span className="text-blue-600">{username}</span>! 🚀
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Ready to turn your snippets into professional art?
                            </p>
                        </div>

                        <Editor 
                            onSaveSuccess={triggerRefresh} 
                            loadSnippet={selectedSnippet} 
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;