const { GetProducts } = require('../controller/ProductController');
const express = require('express');
const router = express.Router();

router.get('/', GetProducts);

module.exports = router;
