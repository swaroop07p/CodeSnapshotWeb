const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { explainCode, ocrCode } = require('../controllers/aiController');

router.post('/explain', auth, explainCode);
router.post('/ocr', auth, ocrCode);

module.exports = router;