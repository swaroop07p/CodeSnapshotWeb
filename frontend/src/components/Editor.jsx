import React, { useRef, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import { Download, Terminal, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";
import API_URL from "../config";

const Editor = ({ onSaveSuccess, loadSnippet }) => {
  // --- 1. States ---
  const [code, setCode] = useState("");
  const [bgGradient, setBgGradient] = useState(
    "from-indigo-500 via-purple-500 to-pink-500",
  );
  const [explanation, setExplanation] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const elementRef = useRef(null);

  // Inside Editor component
  const fileInputRef = useRef(null);

  const handleOcrUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsAiLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Data = reader.result.split(",")[1];
      try {
        // 1. Get the token from storage
        const token = localStorage.getItem("token");

        // 2. Make the request with the CORRECT header name
        const res = await axios.post(
          `${API_URL}/api/ai/ocr`,
          { image: base64Data, mimeType: file.type },
          {
            headers: {
              "x-auth-token": token, // Ensure this matches your middleware
            },
          },
        );

        if (res.data.code) {
          setCode(res.data.code);
        }
      } catch (err) {
        console.error("OCR Request Error:", err.response?.data || err.message);

        // Check if it's a 401 (Auth) or 500 (AI)
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert(
            err.response?.data?.msg || "Failed to extract code from image.",
          );
        }
      } finally {
        setIsAiLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- 2. Hooks ---
  useEffect(() => {
    if (loadSnippet) {
      setCode(loadSnippet.code);
      if (loadSnippet.styling?.background) {
        setBgGradient(loadSnippet.styling.background);
      }
      setExplanation(""); // Clear AI explanation when loading a new snippet
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loadSnippet]);

  // --- 3. AI Logic ---
  const handleAiExplain = async () => {
    if (!code) return;
    setIsAiLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/ai/explain`,
        { code },
        { headers: { "x-auth-token": token } },
      );
      setExplanation(res.data.explanation);
    } catch (err) {
      console.error("AI Error:", err);
      alert("AI service is currently busy. Try again in a moment!");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- 4. Export & Save Logic ---
  const handleExport = async () => {
    if (!elementRef.current) return;

    try {
      const dataUrl = await toPng(elementRef.current, {
        cacheBust: true,
        style: { height: "auto" },
      });

      const link = document.createElement("a");
      link.download = `snippet-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_URL}/api/snippets`,
          {
            code,
            language: "javascript",
            styling: { background: bgGradient },
          },
          { headers: { "x-auth-token": token } },
        );

        if (onSaveSuccess) onSaveSuccess();
      }
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  // --- 5. Render ---
  return (
    <div className="flex flex-col items-center w-full">
      {/* Toolbar */}
      {/* Optimized Toolbar */}
      <div className="w-full max-w-4xl mb-8 p-2 md:p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-slate-800 transition-all">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Left Group: Controls */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 items-center">
            {/* Theme/Gradient Select */}
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-gray-100 dark:border-slate-700">
              <Terminal size={16} className="text-blue-500" />
              <select
                className="bg-transparent text-slate-700 dark:text-slate-200 text-sm outline-none cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onChange={(e) => setBgGradient(e.target.value)}
                value={bgGradient}
              >
                <option
                  value="from-indigo-500 via-purple-500 to-pink-500"
                  className="dark:bg-slate-900"
                >
                  ✨ Magic
                </option>
                <option
                  value="from-cyan-400 to-blue-600"
                  className="dark:bg-slate-900"
                >
                  🌊 Ocean
                </option>
                <option
                  value="from-orange-400 to-red-500"
                  className="dark:bg-slate-900"
                >
                  🌅 Sunset
                </option>
                <option
                  value="from-green-400 to-emerald-600"
                  className="dark:bg-slate-900"
                >
                  🌿 Emerald
                </option>
              </select>
            </div>

            {/* AI Explain Button */}
            <button
              onClick={handleAiExplain}
              disabled={isAiLoading || !code}
              className="flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 px-4 py-2 rounded-xl transition-all disabled:opacity-50 active:scale-95"
            >
              {isAiLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              <span>{isAiLoading ? "Analyzing..." : "Explain Code"}</span>
            </button>

            {/* OCR Button */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-4 py-2 rounded-xl transition-all active:scale-95"
            >
              <Terminal size={18} />
              <span>Scan Image</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleOcrUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Right Group: Export */}
          <button
            onClick={handleExport}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all font-bold shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <Download size={20} />
            Export Image
          </button>
        </div>
      </div>

      {/* Exportable Image Area (Captured) */}
      <div
        ref={elementRef}
        className={`p-6 md:p-12 bg-gradient-to-br ${bgGradient} rounded-xl w-full max-w-4xl transition-all duration-500`}
      >
        <div className="bg-slate-900/90 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-white/10">
          <div className="flex gap-2 px-4 py-3 bg-slate-800/40">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <textarea
            className="w-full bg-transparent text-slate-200 p-6 font-mono text-sm md:text-base outline-none resize-none min-h-[200px]"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setExplanation("");
            }}
            placeholder="// Paste your code here..."
            rows={code.split("\n").length || 10}
          />
        </div>
      </div>

      {/* --- AI Section (Outside the captured div) --- */}
      {explanation && (
        <div className="w-full max-w-4xl mt-8 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Sparkles size={16} />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
              AI Smart Insight
            </h4>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1">
            "{explanation}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
