// src/components/RecentHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { History, ExternalLink, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import API_URL from '../config';

const RecentHistory = ({ refreshTrigger, onSelectSnippet }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, skipping history fetch.");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/snippets/recent`, {
        headers: { "x-auth-token": token },
      });
      setHistory(res.data || []);
    } catch (err) {
      console.error("History Fetch Error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    toast(
      (t) => (
        <div className="flex flex-col gap-3 p-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Delete this snippet permanently?
          </p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  // FIX: Use API_URL instead of hardcoded localhost
                  await axios.delete(
                    `${API_URL}/api/snippets/${id}`,
                    {
                      headers: { "x-auth-token": token },
                    }
                  );
                  setHistory(history.filter((item) => item._id !== id));
                  toast.success("Snippet removed!");
                } catch (err) {
                  toast.error("Could not delete.");
                }
              }}
            >
              Confirm
            </button>
            <button
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        style: {
          background: "#1e293b",
          color: "#f1f5f9",
          border: "1px solid #334155",
        },
      }
    );
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  return (
    <div className="p-6">
      <Toaster position="bottom-right" reverseOrder={false} />

      <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-800 pb-2">
        <History size={20} className="text-blue-500" /> Recent History
      </h3>

      <div className="space-y-3">
        {history.map((item) => (
          <div key={item._id} className="relative group">
            <button
              onClick={() => onSelectSnippet(item)}
              className="w-full text-left p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all shadow-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <ExternalLink
                  size={12}
                  className="opacity-100 text-blue-500" // REMOVED opacity-0 and group-hover
                />
              </div>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate pr-8">
                {item.code}
              </p>
            </button>

            <button
              onClick={(e) => handleDelete(e, item._id)}
              className="absolute right-3 bottom-3 p-1.5 text-red-400 hover:text-red-500 opacity-100 transition-all rounded-md hover:bg-red-50 dark:hover:bg-red-900/20" // REMOVED opacity-0 and group-hover
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentHistory;