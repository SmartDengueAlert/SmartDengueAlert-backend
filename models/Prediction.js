const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    /*prediction_date: { type: Date, default: Date.now },
    risk_level: { type: String }*/
    predictionDate: { type: Date, required: true },
    predictionValue: { type: Number, required: true}
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
