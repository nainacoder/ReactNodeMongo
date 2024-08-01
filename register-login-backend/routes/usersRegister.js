const Register = require('../controller/userRegisterController');
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

router.post('/', Register);

module.exports = router;
