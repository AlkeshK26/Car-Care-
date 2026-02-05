const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// All Analytics & Revenue data
router.get('/stats', adminController.getAdminStats);

// Status Management
router.put('/update-status/:id', adminController.updateBookingStatus);

module.exports = router;