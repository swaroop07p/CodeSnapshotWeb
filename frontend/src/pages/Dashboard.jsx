import React, { useState } from 'react';
import RecentHistory from '../components/RecentHistory';
import Editor from '../components/Editor';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // This function will be passed to Editor to trigger a sidebar update
    const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
            <Navbar />
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                {/* Sidebar - Hidden on small screens, or adjust width */}
                <aside className="w-full md:w-80 border-r dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto">
                    <RecentHistory refreshTrigger={refreshTrigger} />
                </aside>

                {/* Main Editor Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        <Editor onSaveSuccess={triggerRefresh} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;