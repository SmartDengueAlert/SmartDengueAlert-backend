const axios = require('axios');
const Weather = require('../models/weather.js');
const config = require('../config');

const fetchWeatherData = async (location) => {
    try {
        // Fetch current weather data
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${config.weatherApiKey}&q=${location}`);

        // Extract relevant data
        const weatherData = {
            location,
            date: response.data.location.localtime,
            temperature: response.data.current.temp_c,
            humidity: response.data.current.humidity,
            rainfall: response.data.current.precip_mm
        };

        // Save to the database
        await Weather.create(weatherData);

        // Return current weather data
        return weatherData;
    } catch (error) {
        throw new Error('Error fetching weather data');
    }
};

module.exports = {
    fetchWeatherData
};
