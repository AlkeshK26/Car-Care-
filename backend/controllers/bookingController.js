const Booking = require('../models/Booking');

exports.bookService = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking Confirmed! 🚗" });
    } catch (err) {
        res.status(500).json({ success: false, error: "Booking Failed" });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userEmail: req.query.email }).sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
};