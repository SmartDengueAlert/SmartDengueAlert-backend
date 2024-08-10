// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
//end of dilshana's code



//NEW CODE

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
