const { fetchWeatherData } = require('../services/weatherService');
const { fetchDengueData } = require('../services/dengueService');
const { preprocessWeatherNDengueData } = require('../services/wNdpreproService');
const { getPredictionFromFlask } = require('../services/predictionService');

/*// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};*/
//received the calling from predictionRoutes.js to call getPrediction function
const getPrediction = async (req, res) => {
    const location = req.query.location;

    //Checking the Location if it is valid or not
    if (!location) {
        return res.status(400).json({ error: 'prediction_controller.js : Location is required' });
    }
    try {
        //calling for fetchWeatherData function in weatherService.js and get the 'weatherData' from weatherService.js
        const weatherData = await fetchWeatherData(location);
        console.log('preContrl:',location);
        //calling for fetchDengueData function in dengueService.js and get the 'dengueData' from dengueService.js
        const dengueData = await fetchDengueData(location);

        console.log('Dengue Data:', dengueData);
        //calling for preprocessWeatherNDengueData function in wNdpreproService.js and get the 'features' from wNdpreproService.js
        const features = await preprocessWeatherNDengueData(weatherData, dengueData);

        // Get prediction from Flask server
        const prediction = await getPredictionFromFlask(features);

        //send the json type prediction to postman
        res.json({ prediction });

        //Print the prediction which got from the model using flask server
        console.log('Dengue Prediction from Flask server:', prediction);

        //Error Handling
    } catch (error) {
        console.error('prediction_controller.js : Failed to predict dengue warning:', error.message);
        res.status(500).json({ error: 'prediction_controller.js : Failed to predict dengue warning' });
    }
};
//Exporting getPrediction
module.exports = {
    getPrediction
};
