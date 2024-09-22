const { MongoClient } = require('mongodb');

async function run() {
    const uri = "mongodb://localhost:27017"; // Change this to your MongoDB URI if it's different
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('DengueAlertDb');
        const colombo = database.collection('Dengue');

        await colombo.insertMany([
            { location: 'Colombo', date: new Date('2024-01-01'), cases: 5 },
            { location: 'Colombo', date: new Date('2024-01-02'), cases: 7 },
            { location: 'Colombo', date: new Date('2024-01-03'), cases: 6 },
            { location: 'Colombo', date: new Date('2024-01-04'), cases: 8 },
            { location: 'Colombo', date: new Date('2024-01-05'), cases: 10 },
            { location: 'Colombo', date: new Date('2024-01-06'), cases: 4 },
            { location: 'Colombo', date: new Date('2024-01-07'), cases: 12 },
            { location: 'Colombo', date: new Date('2024-01-08'), cases: 9 },
            { location: 'Colombo', date: new Date('2024-01-09'), cases: 11 },
            { location: 'Colombo', date: new Date('2024-01-10'), cases: 13 },
            { location: 'Colombo', date: new Date('2024-01-11'), cases: 14 },
            { location: 'Colombo', date: new Date('2024-01-12'), cases: 8 },
            { location: 'Colombo', date: new Date('2024-01-13'), cases: 6 },
            { location: 'Colombo', date: new Date('2024-01-14'), cases: 10 },
            { location: 'Colombo', date: new Date('2024-01-15'), cases: 7 },
            { location: 'Colombo', date: new Date('2024-01-16'), cases: 5 },
            { location: 'Colombo', date: new Date('2024-01-17'), cases: 11 },
            { location: 'Colombo', date: new Date('2024-01-18'), cases: 13 },
            { location: 'Colombo', date: new Date('2024-01-19'), cases: 12 },
            { location: 'Colombo', date: new Date('2024-01-20'), cases: 9 },
            { location: 'Colombo', date: new Date('2024-01-21'), cases: 14 }
        ]);

        console.log("Data inserted successfully");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
