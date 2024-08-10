// const express = require('express');
// const { login } = require('../controllers/auth_controller.js');

// const router = express.Router();

// router.post('/login', login);

// module.exports = router;
//end of dilshana's code



const express = require('express');
const { register, login } = require('../controllers/auth_controller.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
