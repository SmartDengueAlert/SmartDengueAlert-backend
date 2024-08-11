const weatherService = require('../services/weatherService');

const fetchWeatherData = async (req, res) => {
    const { location } = req.body;

    try {
        const weatherData = await weatherService.fetchWeatherData(location);
        res.status(200).send({ weatherData });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    fetchWeatherData
};
