const Login = require('../controller/userLoginController');
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

router.post('/', Login);

module.exports = router;
