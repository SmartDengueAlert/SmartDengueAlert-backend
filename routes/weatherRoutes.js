const express = require('express');
const { fetchWeatherDataDB, fetchCurrentWeatherDataDB } = require('../controllers/weather_controller.js');

const router = express.Router();

// Route for fetching 14 days of historical weather data
router.post('/fetch', fetchWeatherDataDB);

// Route for fetching current weather data
router.post('/fetch-current', fetchCurrentWeatherDataDB);

module.exports = router;
