/*
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
*/


const axios = require('axios');
const moment = require('moment');
const Weather = require('../models/Weather');
const config = require('../config');
const fetch = require('node-fetch');
//const fetch = require('node-fetch-commonjs');

//received the call from weather_controller.js for fetchWeatherData function and fetching weather data from a external API
const fetchWeatherData = async (location) => {
    const apiKey = config.weatherApiKey;
    console.log('weatherService.js', location);
    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
    const geocodingResponse = await fetch(geocodingApiUrl);
    const geocodingData = await geocodingResponse.json();
    //console.log('**Geo data from API data:', geocodingData , '--End of Geo data--'); // Add logging to inspect the GEO data

    //checking whether geocodingData actually has data
    if (!geocodingData.length) {
        throw new Error(`weatherService.js : Unable to find Location : ${location} or invalid API Key: ${apiKey}`);
    }
//https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&appid=${API key}&units=metric

    const { lat, lon } = geocodingData[0];
    const oneCallApiUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=`;
    const weatherData = [];
    const currentDate = moment();

    //creating current date & time into unix method
    for (let i = 1; i <= 14; i++) {
        const date = currentDate.clone().subtract(i, 'days').unix();
        const apiUrl = `${oneCallApiUrl}${date}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);

        //checking whether the response has data
        if (response.status === 401) {
            console.warn(`Api key use for One by One Call  : ${apiKey}`);
            throw new Error('weatherService.js : Invalid API key for One Call API. Please check the API key or the subscription plan.');
        }

        const data = await response.json();
        const readableDate = currentDate.clone().subtract(i, 'days').format('YYYY-MM-DD');
        console.log(`**Day ${i} => ${date}  :  ${readableDate}`);
        console.log(`*Used API URL for day ${i} => ${apiUrl}`);
        //console.log(`**Weather data for Day ${i}:`, data); // Add logging to inspect the weather data day by day
        console.log(`--End of Day ${i} Weather data--`);
        console.log('------------------------------------------------------------------------------------------------------------------');

        //pushing data into weatherData Array one by one
        weatherData.push(data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to avoid hitting rate limits
    }
    return weatherData;
};

const fetchCurrentWeatherData = async (location) => {
    const apiKey = config.weatherApiKey;
    console.log('Fetching current weather data for location:', location);

    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
    const geocodingResponse = await fetch(geocodingApiUrl);
    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.length) {
        throw new Error(`Unable to find Location: ${location} or invalid API Key.`);
    }

    const { lat, lon } = geocodingData[0];
    const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const weatherResponse = await fetch(currentWeatherApiUrl);

    if (weatherResponse.status === 401) {
        throw new Error('Invalid API key for current weather API.');
    }

    const weatherData = await weatherResponse.json();
    console.log('Weather response data:', weatherData);
    const currentWeather = {
        location: `${geocodingData[0].name}, ${geocodingData[0].country}`,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        rainfall: weatherData.rain ? weatherData.rain['1h'] : 0.0,
        weatherDescription: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
    };

    console.log('Current weather data:', currentWeather);

    // Remove the line that saves to the database
    // await Weather.create(currentWeather);

    return currentWeather;
};


// Export both functions
module.exports = {
    fetchWeatherData,       // Historical weather
    fetchCurrentWeatherData // Current weather
};