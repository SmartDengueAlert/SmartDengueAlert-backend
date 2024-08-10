// const mongoose = require('mongoose');

// const predictionSchema = new mongoose.Schema({
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     prediction_date: { type: Date, default: Date.now },
//     risk_level: { type: String }
// });

// const Prediction = mongoose.model('Prediction', predictionSchema);

// module.exports = Prediction;
//end of dilshana's code


//NEW CODE

const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    predictionDate: { type: Date, required: true },
    predictionValue: { type: Number, required: true }
});

module.exports = mongoose.model('Prediction', predictionSchema);
