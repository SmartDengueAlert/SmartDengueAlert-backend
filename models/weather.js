// const mongoose = require('mongoose');

// const weatherSchema = new mongoose.Schema({
//     location: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     temperature: { type: Number },
//     humidity: { type: Number },
//     rainfall: { type: Number }
// });

// const Weather = mongoose.model('Weather', weatherSchema);

// module.exports = Weather;
//end of dilshana's code



//NEW CODE

const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: Date, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    dewPoint: { type: Number, required: true },
    precipitation: { type: Number, required: true }
});

module.exports = mongoose.model('Weather', weatherSchema);
