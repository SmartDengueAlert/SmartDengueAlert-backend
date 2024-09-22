/*
// import Sequelize from 'sequelize';
// const sequelize = new Sequelize('dengue_app', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });
//
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
//
// // Models/tables
// db.user = require('./models/User')(sequelize, Sequelize);
// db.prediction = require('./models/Prediction')(sequelize, Sequelize);
// db.weather = require('./models/Weather')(sequelize, Sequelize);
//
// module.exports = db;
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dengue_project_db', 'root', '1234', {
    host: 'localhost',  // or '127.0.0.1'
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = require('./models/User')(sequelize, Sequelize);
db.prediction = require('./models/Prediction')(sequelize, Sequelize);
db.weather = require('./models/Weather')(sequelize, Sequelize);

module.exports = db;
*/

const mongoose = require('mongoose');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// No need to define models here; they will be defined in their respective files
module.exports = mongoose;
