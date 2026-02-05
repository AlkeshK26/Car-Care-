const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    location: { type: String, required: true },
    serviceType: { type: String, required: true },
    serviceMode: { 
        type: String, 
        enum: ['Garage Service', 'Doorstep Wash'], 
        required: true 
    },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, default: "Pending ⏳" },
    price: { type: Number, default: 0 },
    
    // --- NEW FIELDS FOR GARAGE OWNER ---
    garageOwnerEmail: { type: String, required: true }, // Filter karne ke liye
    garageName: { type: String, required: true }      // Owner ka garage identity
    
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);