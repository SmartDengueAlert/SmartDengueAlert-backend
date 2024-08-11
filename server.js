// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// import fetch from 'node-fetch'; // Import the 'node-fetch' package
//
// const app = express();
// const port = 3000;
//
// // Create MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'dengue_project_db'
// });
//
// // Connect to MySQL
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err.message);
//         // Gracefully handle the error, e.g., exit the application or log the error
//         process.exit(1);
//     }
//     console.log('Connected to MySQL database');
// });
//
// // Middleware
// app.use(bodyParser.json());
//
// // Example endpoint to fetch weather data for a location
// app.get('/predictDengueWarning', async (req, res) => {
//     const location = req.query.location;
//     try {
//         const weatherData = await fetchWeatherData(location);
//         const preprocessedData = preprocessWeatherData(weatherData);
//         const prediction = mlModel.predict(preprocessedData);
//         res.json({ prediction });
//     } catch (error) {
//         console.error('Error predicting dengue warning:', error.message);
//         res.status(500).json({ error: 'Failed to predict dengue warning' });
//     }
// });
//
// // Function to fetch weather data from an external API (e.g., OpenWeather)
// async function fetchWeatherData(location) {
//     const apiKey = '9e425371311cb9bc2598ffefe2c5b53a';
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data;
// }
//
// // Function to preprocess weather data (implement as needed)
// function preprocessWeatherData(weatherData) {
//     // Implement preprocessing logic here if necessary
//     return weatherData;
// }
//
// // Load your machine learning model (mlModel) here (replace with actual implementation)
//
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
