const express = require('express');
const router = express.Router();
const { getNumbers } = require('../controllers/numbersController');

router.get('/numbers/:numberid', getNumbers);

module.exports = router;