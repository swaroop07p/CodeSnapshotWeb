// backend/routes/snippetRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Add deleteSnippet to the curly braces here
const { 
    saveSnippet, 
    getRecentSnippets, 
    deleteSnippet 
} = require('../controllers/snippetController');

// All snippet routes require being logged in
router.post('/', auth, saveSnippet);
router.get('/recent', auth, getRecentSnippets);

// Now use the destructured function name directly
router.delete('/:id', auth, deleteSnippet);

module.exports = router;