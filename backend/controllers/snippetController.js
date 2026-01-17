const Snippet = require('../models/Snippet');

// SAVE A NEW SNIPPET
exports.saveSnippet = async (req, res) => {
    const { code, language, theme, styling } = req.body;
    try {
        const newSnippet = new Snippet({
            user: req.user.id, // This MUST be present from authMiddleware
            code,
            language,
            theme,
            styling
        });
        const saved = await newSnippet.save();
        res.status(201).json(saved);
    } catch (err) {
        console.error("Save Error:", err.message);
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

// DELETE A SNIPPET (Add this function)
exports.deleteSnippet = async (req, res) => {
    try {
        const snippet = await Snippet.findById(req.params.id);

        if (!snippet) {
            return res.status(404).json({ msg: 'Snippet not found' });
        }

        // Verify ownership
        if (snippet.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Snippet.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Snippet removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during deletion' });
    }
};