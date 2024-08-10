// const axios = require('axios');

// exports.getPrediction = async (weatherData) => {
//     try {
//         const response = await axios.post('http://our-python-server/predict', weatherData);
//         return response.data;
//     } catch (error) {
//         throw new Error('Error getting prediction');
//     }
// };
//end of dilshana's code


const fetch = require('node-fetch-commonjs');

// Function to get prediction from Flask server
// Received call from prediction_controller.js and fetching dengue prediction from the flask server
async function getPredictionFromFlask(features) { 
    try{
        const response = await fetch('http://localhost:5000/predict', {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ features }), // Send the features array
        });
        const data = await response.json();
        return data;
        
      //Error Handling  
    } catch (error) {
        console.error('Error getting prediction from Flask server:', error);
        throw error;
    }
};
//Exporting getPredictionFromFlask function to use in prediction_controller
module.exports = {
    getPredictionFromFlask
};
