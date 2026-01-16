const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { explainCode } = require('../controllers/aiController');

router.post('/explain', auth, explainCode);

module.exports = router;