const weatherService = require('../services/weatherService');

const fetchWeatherDataDB = async (req, res) => {
    const { location } = req.body;

    try {
        const weatherData = await weatherService.fetchWeatherData(location);
        console.log(`Weather data fetched successfully for ${location} for 14 days`);
        console.log(weatherData);
        console.log('**************End of weatherData*************');

        // Sending response to the client
        res.status(200).json({ message: `Weather data for ${location}`, data: weatherData });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



const fetchCurrentWeatherDataDB = async (req, res) => {
    const { location } = req.body;

    try {
        const currentWeatherData = await weatherService.fetchCurrentWeatherData(location);
        console.log(`Current weather data fetched successfully for ${location}`);
        console.log(currentWeatherData);
        console.log('**************End of currentWeatherData*************');

        // Sending response to the client
        res.status(200).json({ message: `Current weather data for ${location}`, data: currentWeatherData });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    fetchWeatherDataDB,
    fetchCurrentWeatherDataDB
};
