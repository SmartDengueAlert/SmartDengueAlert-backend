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
