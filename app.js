// const express = require('express');
// const mongoose = require('mongoose');
// const cron = require('node-cron');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes.js');
// const predictionRoutes = require('./routes/predictionRoutes.js');
// const weatherRoutes = require('./routes/weatherRoutes.js');
// const User = require('./models/User.js');
// const config = require('./config.js');
// const cors = require('cors');
// const { fetchWeatherData } = require('./controllers/weather_controller.js');
// const { getPrediction } = require('./controllers/predictionController.js');

// const app = express();

// app.use(cors());

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// app.use('/auth', authRoutes);
// app.use('/predictions', predictionRoutes);
// app.use('/weather', weatherRoutes);

// cron.schedule('0 */3 * * *', async () => {
//     const users = await User.find({});
//     for (const user of users) {
//         try {
//             const weatherData = await fetchWeatherData(user.location);
//             const prediction = await getPrediction(weatherData);
//             if (prediction.danger) {
//                 // Implement sending alerts here
//                 console.log(`Alert: Dengue outbreak predicted for user ${user.id}`);
//             }
//         } catch (error) {
//             console.error('Error processing cron job:', error.message);
//         }
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
//end of dilshana's code


//NEW CODE

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const dengueRoutes = require('./routes/dengueRoutes')
const User = require('./models/User');
const config = require('./config');

const { fetchWeatherData } = require('./services/weatherService');
const { fetchDengueData} = require('./services/dengueService');
const { preprocessWeatherNDengueData } = require('./services/wNdpreproService');
const { getPredictionFromFlask } = require('./services/predictionService');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/predictions', predictionRoutes);
app.use('/weather', weatherRoutes);
app.use('/dengue', dengueRoutes);
app.use(errorHandler);

cron.schedule('0 */3 * * *', async () => {
    const users = await User.find({});
    for (const user of users) {
        try {
            const weatherData = await fetchWeatherData(user.location);
            const dengueData = await fetchDengueData(user.location);
            const preprocessedData = await preprocessWeatherNDengueData(weatherData, dengueData);
            const prediction = await getPredictionFromFlask(preprocessedData);
            if (prediction.danger) {
                console.log(`Alert: Dengue outbreak predicted for user ${user.id}`);
            }
        } catch (error) {
            console.error('Error processing cron job:', error.message);
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
