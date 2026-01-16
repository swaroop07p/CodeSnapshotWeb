import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History } from 'lucide-react';

const RecentHistory = ({ refreshTrigger }) => {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await axios.get('http://localhost:5000/api/snippets/recent', {
                headers: { 'x-auth-token': token }
            });
            setHistory(res.data);
        } catch (err) {
            console.error("Could not fetch history", err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [refreshTrigger]); // This triggers the reload when a snippet is saved

    return (
        <div className="p-6">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100 mb-6">
                <History size={20} className="text-blue-500" /> Recent Snippets
            </h3>
            {history.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No snippets yet. Export one!</p>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item._id} className="group p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 hover:border-blue-500 transition-all cursor-pointer">
                            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate mb-1">
                                {item.code}
                            </p>
                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentHistory;