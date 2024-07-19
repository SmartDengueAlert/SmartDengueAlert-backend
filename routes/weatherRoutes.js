const express = require('express');
const { fetchWeatherData } = require('../controllers/weather_controller.js');

const router = express.Router();

router.post('/fetch', fetchWeatherData);

module.exports = router;
