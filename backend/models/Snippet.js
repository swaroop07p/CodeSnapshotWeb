const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'vs-dark' },
    styling: {
        background: { type: String }, // Gradient or Hex
        padding: { type: Number },
        showWindowControls: { type: Boolean, default: true }
    },
    createdAt: { type: Date, default: Date.now }
});

// Important: Indexing to help find recent snippets faster
SnippetSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Snippet', SnippetSchema);