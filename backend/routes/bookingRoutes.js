const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route: POST /api/bookings/book
router.post('/book', bookingController.bookService);

// Route: GET /api/bookings/my-bookings
router.get('/my-bookings', bookingController.getUserBookings);

module.exports = router;