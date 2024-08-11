const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prediction_date: { type: Date, default: Date.now },
    risk_level: { type: String }
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
