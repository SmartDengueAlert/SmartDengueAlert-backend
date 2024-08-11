const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const config = require('../config.js');

async function login(req, res) {
    const { email, password } = req.body;

    // Simple email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password length validation
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if the user exists in the database
        let user = await User.findOne({ email });

        // If user doesn't exist, create a new user
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

            // Create a new User object
            user = new User({
                email,
                password: hashedPassword
            });

            // Save the new user to the database
            await user.save();

            // Generate JWT token without expiry
            const token = jwt.sign({ userId: user._id }, config.secret);

            // Return success response with token
            return res.status(200).json({ token });
        }

        // Validate the password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token without expiry
        const token = jwt.sign({ userId: user._id }, config.secret);

        // Return success response with token
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    login
};
