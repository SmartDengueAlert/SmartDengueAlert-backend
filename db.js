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
//end of dilshana's code


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
