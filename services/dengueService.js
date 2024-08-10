const mysql = require('mysql2');

// Create MySQL connection for fetching dengue data
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'dengue_project_db'
});

// Received call from dengue_controller.js and Fetching dengue data from database
const fetchDengueData = async (location) => {
    return new Promise((resolve, reject) => {
//const query = 'SELECT dengue_date, dengue_deaths FROM dengue_cases ORDER BY dengue_date DESC LIMIT 14';
        const query = 'SELECT * FROM  colombo ORDER BY dengue_date DESC LIMIT 14';
        db.query(query, (err, dengueData) => {
            if (err) {
                console.error('dengueService.js Alert : Error executing query:', err);
                return reject(err);
            }
            resolve(dengueData);            
        });
    });
};
//exporting the function to be used in dengue_controller.js
module.exports = {
    fetchDengueData
};

