const predictionService = require('../services/predictionService');
const weatherService = require('../services/weatherService');

const getPrediction = async (req, res) => {
    const { location, userId } = req.body;

    try {
        // Fetch current weather data
        const weatherData = await weatherService.fetchWeatherData(location);

        // Get prediction from the ML model
        const predictionResult = await predictionService.getPrediction(weatherData);

        // Create a new prediction record
        const prediction = new Prediction({
            user_id: userId,
            risk_level: predictionResult.risk_level
        });

        // Save the prediction to the database
        await prediction.save();

        // Return the prediction
        res.status(200).send({ prediction });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getPrediction
};
