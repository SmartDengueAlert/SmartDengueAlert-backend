const { MongoClient } = require('mongodb');

// Create MongoDB connection for fetching dengue data
const uri = "mongodb://localhost:27017"; // Change this to your MongoDB URI if it's different
const client = new MongoClient(uri);

// Helper function to format dates as 'YYYY-MM-DD'
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Fetch dengue data from MongoDB
const fetchDengueData = async (location) => {
    try {
        await client.connect();
        const database = client.db('DengueAlertDb');
        const collection = database.collection('Dengue');

        // Query to fetch data for a specific location, sorted by date in descending order, and limit the results to 14 documents
        const query = { location: location }; // Filter by location
        const options = {
            sort: { date: -1 }, // Sort by date in descending order
            limit: 14 // Limit results to 14 documents
        };

        const dengueData = await collection.find(query, options).toArray();
        return dengueData;

    } catch (err) {
        console.error('dengueService.js Alert : Error fetching data:', err);
        throw err;
    } finally {
        await client.close();
    }
};

// Exporting the function to be used in dengue_controller.js
module.exports = {
    fetchDengueData
};
