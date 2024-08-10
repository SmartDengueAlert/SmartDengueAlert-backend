// const predictionService = require('../services/predictionService');
// const weatherService = require('../services/weatherService');

// const getPrediction = async (req, res) => {
//     const { location, userId } = req.body;

//     try {
//         // Fetch current weather data
//         const weatherData = await weatherService.fetchWeatherData(location);

//         // Get prediction from the ML model
//         const predictionResult = await predictionService.getPrediction(weatherData);

//         // Create a new prediction record
//         const prediction = new Prediction({
//             user_id: userId,
//             risk_level: predictionResult.risk_level
//         });

//         // Save the prediction to the database
//         await prediction.save();

//         // Return the prediction
//         res.status(200).send({ prediction });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// module.exports = {
//     getPrediction
// };
//end of dilshana's code


//Importing All Functions from services folder
const { fetchWeatherData } = require('../services/weatherService');
const { fetchDengueData } = require('../services/dengueService');
const { preprocessWeatherNDengueData } = require('../services/wNdpreproService');
const { getPredictionFromFlask } = require('../services/predictionService');

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

        //calling for fetchDengueData function in dengueService.js and get the 'dengueData' from dengueService.js
        const dengueData = await fetchDengueData(location);

        //calling for preprocessWeatherNDengueData function in wNdpreproService.js and get the 'features' from wNdpreproService.js
        const features = await preprocessWeatherNDengueData(weatherData, dengueData);

        //calling for getPredictionFromFlask function in predictionService.js and get the 'prediction' from predictionService.js
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
    getPrediction,
};
