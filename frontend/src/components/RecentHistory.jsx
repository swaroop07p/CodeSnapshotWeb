import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { History, ExternalLink } from 'lucide-react';

const RecentHistory = ({ refreshTrigger, onSelectSnippet }) => {
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await axios.get('http://localhost:5000/api/snippets/recent', {
                headers: { 'x-auth-token': token }
            });
            setHistory(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        fetchHistory();
    }, [refreshTrigger]);

    return (
        <div className="p-6">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-800 pb-2">
                <History size={20} className="text-blue-500" /> Recent History
            </h3>
            <div className="space-y-3">
                {history.map((item) => (
                    <button 
                        key={item._id} 
                        onClick={() => onSelectSnippet(item)}
                        className="w-full text-left group p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/40 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 transition-all shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity" />
                        </div>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                            {item.code}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecentHistory;