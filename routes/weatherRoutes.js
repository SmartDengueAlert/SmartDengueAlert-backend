// const express = require('express');
// const { fetchWeatherData } = require('../controllers/weather_controller.js');

// const router = express.Router();

// router.post('/fetch', fetchWeatherData);

// module.exports = router;
//end of dilshana's code

const express = require('express');
const { getWeatherData } = require('../controllers/weather_controller.js');
const router = express.Router();

//calling for getWeatherData function in weather_controller.js
router.get('/predictDengueWarning', getWeatherData);

module.exports = router;
