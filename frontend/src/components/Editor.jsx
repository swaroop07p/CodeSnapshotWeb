import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Terminal } from "lucide-react";
import axios from "axios";

const Editor = ({ onSaveSuccess }) => {
  const [code, setCode] = useState("");
  const [bgGradient, setBgGradient] = useState(
    "from-indigo-500 via-purple-500 to-pink-500"
  );
  const elementRef = useRef(null);

  const handleExport = async () => {
    if (!elementRef.current) return;

    try {
      // Generate Image
      const dataUrl = await toPng(elementRef.current, {
        cacheBust: true,
        style: { height: "auto" }, // Force capture full height
      });

      const link = document.createElement("a");
      link.download = `snippet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      // Save to MongoDB
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://localhost:5000/api/snippets",
          {
            code,
            language: "javascript",
            styling: { background: bgGradient },
          },
          { headers: { "x-auth-token": token } }
        );

        if (onSaveSuccess) onSaveSuccess(); // Refresh the sidebar!
      }
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Toolbar */}
      {/* Toolbar */}
      <div className="w-full max-w-3xl mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center transition-colors">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Terminal size={18} className="text-blue-600 dark:text-blue-400" />
          </div>

          {/* Updated Styled Select */}
          <select
            className="bg-transparent text-slate-700 dark:text-slate-200 text-sm font-medium outline-none cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors appearance-none"
            onChange={(e) => setBgGradient(e.target.value)}
          >
            <option
              value="from-indigo-500 via-purple-500 to-pink-500"
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              ✨ Magic
            </option>
            <option
              value="from-cyan-400 to-blue-600"
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              🌊 Ocean
            </option>
            <option
              value="from-orange-400 to-red-500"
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              🌅 Sunset
            </option>
            <option
              value="from-green-400 to-emerald-600"
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
            >
              🌿 Emerald
            </option>
          </select>
        </div>

        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all font-semibold shadow-lg shadow-blue-500/20"
        >
          <Download size={18} /> Export PNG
        </button>
      </div>

      {/* Exportable Area */}
      <div
        ref={elementRef}
        className={`p-6 md:p-12 bg-gradient-to-br ${bgGradient} rounded-xl w-full max-w-4xl`}
      >
        <div className="bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-white/10">
          {/* Mac Controls */}
          <div className="flex gap-2 px-4 py-3 bg-slate-800/40">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {/* Auto-sizing Textarea */}
          <textarea
            className="w-full bg-transparent text-slate-200 p-6 font-mono text-sm md:text-base outline-none resize-none min-h-[200px]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code here..." // This will disappear automatically on paste
            rows={code.split("\n").length || 10}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
