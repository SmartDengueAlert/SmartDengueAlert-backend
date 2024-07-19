const express = require('express');
const { getPrediction } = require('../controllers/predictionController.js');
const { verifyToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/getPrediction', verifyToken, getPrediction);

module.exports = router;
