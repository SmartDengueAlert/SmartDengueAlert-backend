const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: Date, default: Date.now },
    temperature: { type: Number },
    humidity: { type: Number },
    rainfall: { type: Number }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
