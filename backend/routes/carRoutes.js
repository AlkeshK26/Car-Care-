const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/search', carController.searchCars);

module.exports = router;