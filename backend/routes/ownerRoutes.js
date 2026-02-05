const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

// Existing stats route
router.get('/stats', ownerController.getOwnerStats);

// New Management Routes
router.post('/add-service', ownerController.addService);
router.post('/remove-service', ownerController.removeService);
router.put('/update-garage', ownerController.updateGarage);

module.exports = router;