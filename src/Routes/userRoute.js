
const express = require('express');
const router = express.Router();
const {loginUser,registerUser} = require('../Controller/userController')


// Define the route to fetch data
router.post('/login', loginUser);

router.post('/register', registerUser);

module.exports = router;