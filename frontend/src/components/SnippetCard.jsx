import React from "react";
import { Code, Calendar } from "lucide-react";

const SnippetCard = ({ snippet, onClick }) => {
  return (
    <div
      onClick={() => onClick(snippet)}
      className="group p-4 mb-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
          {snippet.language || "Code"}
        </span>
        <Calendar size={12} className="text-slate-400" />
      </div>
      <p className="text-sm font-mono text-slate-600 dark:text-slate-400 truncate">
        {snippet.code}
      </p>
    </div>
  );
};

export default SnippetCard;
