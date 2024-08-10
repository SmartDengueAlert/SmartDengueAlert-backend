// const express = require('express');
// const { getPrediction } = require('../controllers/predictionController.js');
// const { verifyToken } = require('../middleware/authMiddleware.js');

// const router = express.Router();

// router.post('/getPrediction', verifyToken, getPrediction);

// module.exports = router;
//end of dilshana's code


const express = require('express');
const { getPrediction } = require('../controllers/prediction_controller');
const router = express.Router();

//calling for getPrediction function in prediction_controller.js
router.get('/predictDengueWarning', getPrediction);
    
module.exports = router;
