const express = require('express');
const { getDengueData } = require('../controllers/dengue_controller.js');
const router = express.Router();

//calling for getDengueData function in dengue_controller.js
router.get('/predictDengueWarning', getDengueData);
module.exports = router;
 
