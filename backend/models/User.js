const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'garage_owner'], // Naya role add kiya
        default: 'user' 
    },
    
    // --- ONLY FOR GARAGE OWNERS ---
    garageName: { type: String, default: "" }, 
    locationArea: { type: String }, 
    services: [
        {
            serviceName: String,
            price: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);