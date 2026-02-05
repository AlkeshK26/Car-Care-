const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/database'); // DB function import karein

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection call
dbConnect();

// Routes Import
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
// Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send("CarCare Pro Backend is Running smoothly!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});