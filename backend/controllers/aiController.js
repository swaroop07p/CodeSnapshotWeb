const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the SDK
// Make sure this is exactly as written
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// backend/controllers/aiController.js

exports.explainCode = async (req, res) => {
    const { code } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) return res.status(500).json({ msg: "API Key missing" });
    if (!code) return res.status(400).json({ msg: "No code provided" });

    try {
        // We use the exact model name your key listed: gemini-2.5-flash
        // We use the STABLE v1 endpoint for production reliability
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Explain this code snippet in exactly two professional sentences for developer documentation: \n\n${code}`
                    }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("🚀 Gemini API Error:", data.error.message);
            return res.status(500).json({ msg: data.error.message });
        }

        if (data.candidates && data.candidates[0].content) {
            const explanation = data.candidates[0].content.parts[0].text;
            res.json({ explanation });
        } else {
            res.status(500).json({ msg: "AI returned empty response" });
        }

    } catch (err) {
        console.error("🚀 Server Error:", err.message);
        res.status(500).json({ msg: "AI Explanation failed" });
    }
};