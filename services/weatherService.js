// const axios = require('axios');
// const Weather = require('../models/weather.js');
// const config = require('../config');

// const fetchWeatherData = async (location) => {
//     try {
//         // Fetch current weather data
//         const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${config.weatherApiKey}&q=${location}`);

//         // Extract relevant data
//         const weatherData = {
//             location,
//             date: response.data.location.localtime,
//             temperature: response.data.current.temp_c,
//             humidity: response.data.current.humidity,
//             rainfall: response.data.current.precip_mm
//         };

//         // Save to the database
//         await Weather.create(weatherData);

//         // Return current weather data
//         return weatherData;
//     } catch (error) {
//         throw new Error('Error fetching weather data');
//     }
// };

// module.exports = {
//     fetchWeatherData
// };
//end of dilshana's code



const axios = require('axios');
const moment = require('moment');
const Weather = require('../models/Weather');
const config = require('../config');
const mysql = require('mysql2');
const fetch = require('node-fetch-commonjs');

//received the call from weather_controller.js for fetchWeatherData function and fetching weather data from a external API
const fetchWeatherData = async (location) => {
    const apiKey = config.weatherApiKey;
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
            throw new Error('weatherService.js : Invalid API key for One Call API. Please check your API key or the subscription plan.');
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

//exporting the function to be used in weather_controller.js
module.exports = {
    fetchWeatherData
};
