import React, { useState, useEffect } from "react";
import RecentHistory from "../components/RecentHistory";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import { History, X } from "lucide-react"; // Added X for closing
import { CodeXml } from "lucide-react";

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
        <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            {/* Greeting Card */}
            <div className="mb-8 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-blue-500/5 border border-gray-100 dark:border-slate-800 flex items-center justify-between overflow-hidden relative group">
              {/* Decorative Background Glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight flex items-center gap-3">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-[1.2] pb-1 inline-block">
                      Happy Coding, {username}!
                    </span>
                    <CodeXml
                      size={36}
                      className="text-blue-500 animate-bounce hidden md:block"
                    />
                  </h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2 font-medium">
                  {isHistoryOpen
                    ? "Select a previous snippet to continue editing."
                    : "Your AI-powered workspace is ready. What are we building today?"}
                </p>
              </div>
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
