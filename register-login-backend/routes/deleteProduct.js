const { DeleteProducts } = require('../controller/ProductController');
const express = require('express');
const router = express.Router();

router.delete('/:id', DeleteProducts);

module.exports = router;
