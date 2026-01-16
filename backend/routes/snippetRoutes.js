const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { saveSnippet, getRecentSnippets } = require('../controllers/snippetController');

// All snippet routes require being logged in
router.post('/', auth, saveSnippet);
router.get('/recent', auth, getRecentSnippets);

module.exports = router;