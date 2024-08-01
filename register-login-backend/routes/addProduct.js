const { AddProducts } = require('../controller/ProductController');
const express = require('express');
const router = express.Router();

router.post('/', AddProducts);

module.exports = router;
