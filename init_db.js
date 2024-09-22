/*
// import mysql from 'mysql2';
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234'
// });
//
// const dbName = 'dengue_app';
//
// const createDatabaseAndTables = `
// CREATE DATABASE IF NOT EXISTS ${dbName};
// USE ${dbName};
//
// CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     name VARCHAR(255),
//     location VARCHAR(255)
// );
//
// CREATE TABLE IF NOT EXISTS weather_data (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     location VARCHAR(255),
//     date DATE,
//     temperature FLOAT,
//     humidity FLOAT,
//     rainfall FLOAT
// );
//
// CREATE TABLE IF NOT EXISTS dengue_predictions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     prediction_date DATE,
//     risk_level VARCHAR(50),
//     FOREIGN KEY (user_id) REFERENCES users(id)
// );
// `;
//
// connection.query(createDatabaseAndTables, (err, results) => {
//     if (err) throw err;
//     console.log('Database and tables created or already exist');
//     connection.end();
// });


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',  // or '127.0.0.1'
    user: 'root',
    password: '1234'
});

const dbName = 'dengue_project_db';

// Function to execute a query and handle errors
const executeQuery = (query, callback) => {
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return callback(err);
        }
        callback(null, results);
    });
};


// Create database
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${dbName};`;
executeQuery(createDatabaseQuery, (err) => {
    if (err) return connection.end();
    console.log('Database created or already exists');

    // Use the database
    connection.query(`USE ${dbName}`, (err) => {
        if (err) return connection.end();
        console.log('Using database:', dbName);

        // Create tables individually
        const createUsersTableQuery = `
     CREATE TABLE IF NOT EXISTS users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         name VARCHAR(255),
         location VARCHAR(255)
     );
     `;

        const createWeatherDataTableQuery = `
     CREATE TABLE IF NOT EXISTS weather_data (
         id INT AUTO_INCREMENT PRIMARY KEY,
         location VARCHAR(255),
         date DATE,
         temperature FLOAT,
         humidity FLOAT,
         dew_point FLOAT,
         precipitation FLOAT
     );
     `;

        const createDenguePredictionsTableQuery = `
     CREATE TABLE IF NOT EXISTS colombo ( 
         id INT AUTO_INCREMENT PRIMARY KEY,       
         dengue_date DATETIME,     
         dengue_deaths INT 
          
     );
     `;

        // Create users table
        executeQuery(createUsersTableQuery, (err) => {
            if (err) return connection.end();

            // Create weather_data table
            executeQuery(createWeatherDataTableQuery, (err) => {
                if (err) return connection.end();

                // Create dengue_predictions table
                executeQuery(createDenguePredictionsTableQuery, (err) => {
                    if (err) return connection.end();
                    console.log('Tables created or already exist');
                    connection.end();
                });
            });
        });
    });

});

*/
