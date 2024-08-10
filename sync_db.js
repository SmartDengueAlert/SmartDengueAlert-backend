const db = require('./db');

// Sync all models with the database
db.sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables have been created');
}).catch(error => {
    console.error('Error syncing database:', error);
});
