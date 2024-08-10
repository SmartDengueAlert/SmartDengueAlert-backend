// const jwt = require('jsonwebtoken');

// function verifyToken(req, res, next) {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         console.error('Token verification failed:', error);
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// }

// module.exports = {
//     verifyToken
// };
//end of dilshana's code


//NEW CODE

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const config = require('../config.js');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = { 
    authMiddleware
};
