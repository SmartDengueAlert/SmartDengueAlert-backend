const mongoose = require('mongoose');

const dengueSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: Date, required: true },
    cases: { type: Number, required: true },
    //deaths: { type: Number, required: true }
});

module.exports = mongoose.model('Dengue', dengueSchema);
