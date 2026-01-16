import React, { useState, useEffect } from "react";
import RecentHistory from "../components/RecentHistory";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import { History, X } from "lucide-react"; // Added X for closing

const Dashboard = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [username, setUsername] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false); // Mobile toggle

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    setUsername(savedUser || "Developer");
  }, []);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* 1. Mobile History Toggle Button (Only visible on small screens) */}
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl active:scale-95 transition-transform"
        >
          {isHistoryOpen ? <X size={24} /> : <History size={24} />}
        </button>

        {/* 2. Responsive Sidebar (Hidden on mobile unless toggled) */}
        <aside
          className={`
                    fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:inset-auto md:z-auto
                    w-full md:w-80 border-r dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto
                    ${
                      isHistoryOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
        >
          <RecentHistory
            refreshTrigger={refreshTrigger}
            onSelectSnippet={(snippet) => {
              setSelectedSnippet(snippet);
              setIsHistoryOpen(false); // Close drawer on mobile after selection
            }}
          />
        </aside>

        {/* 3. Main Editor Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full">
          <div className="max-w-5xl mx-auto">
            {/* Greeting Card */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg text-white">
              <h2 className="text-xl md:text-3xl font-bold">
                Happy Coding, {username}!
              </h2>
              <p className="text-blue-100 text-sm mt-1 opacity-90">
                {isHistoryOpen
                  ? "Pick a snippet to load it."
                  : "Use the button below to view history on mobile."}
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
