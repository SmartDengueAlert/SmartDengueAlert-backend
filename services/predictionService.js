const axios = require('axios');

exports.getPrediction = async (weatherData) => {
    try {
        const response = await axios.post('http://our-python-server/predict', weatherData);
        return response.data;
    } catch (error) {
        throw new Error('Error getting prediction');
    }
};
