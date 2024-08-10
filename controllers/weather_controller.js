// const weatherService = require('../services/weatherService');

// const fetchWeatherData = async (req, res) => {
//     const { location } = req.body;

//     try {
//         const weatherData = await weatherService.fetchWeatherData(location);
//         res.status(200).send({ weatherData });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

// module.exports = {
//     fetchWeatherData
// };
//end of dilshana's code

//Importing fetchWeatherData function from weatherService.js
const { fetchWeatherData } = require('../services/weatherService');

//received the calling from weatherRoutes.js to call getWeatherData function
const getWeatherData = async (req, res) => {
    const location = req.query.location;

    //Checking the Location if it is valid or not
    if (!location) {
        return res.status(400).json({ error:' weatherRoutes.js Alert : Location is required' });
    }
    try {      
        //calling for fetchWeatherData function in weatherService.js and get the weatherData from weatherService.js
        const weatherData = await fetchWeatherData(location);
        console.log(`************weather_controller.js : Weather data fetched successfully for ${location} for 14 days from weatherServices.js ************` );
        console.log(weatherData);
        console.log('**************End of weatherData*************');

        //send a json file for postman
        res.json({ message: `weatherRoutes.js : Weather data for ${location}`, data: weatherData });
        return weatherData;
        
        //Error Handling
    } catch (error) {
        console.error('weather_controller.js : Failed to fetch weather data', error);
        res.status(500).json({ error: 'weather_controller.js : Failed to fetch weather data' });
    }
};
//Exporting getWeatherData
module.exports = { 
    getWeatherData
};




