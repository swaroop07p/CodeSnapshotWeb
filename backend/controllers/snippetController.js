const Snippet = require('../models/Snippet');

// SAVE A NEW SNIPPET
exports.saveSnippet = async (req, res) => {
    const { code, language, theme, styling } = req.body;
    try {
        const newSnippet = new Snippet({
            user: req.user.id, // ID comes from authMiddleware
            code,
            language,
            theme,
            styling
        });
        const saved = await newSnippet.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to save snippet' });
    }
};

// GET LAST 5 SNIPPETS
exports.getRecentSnippets = async (req, res) => {
    try {
        const snippets = await Snippet.find({ user: req.user.id })
            .sort({ createdAt: -1 }) // Newest first
            .limit(5);               // Limit to 5
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};