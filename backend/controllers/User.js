const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    locationArea: { type: String, required: true },
    carName: { type: String, required: true }, // Recommendation se aayega
    carModel: { type: String, required: true }, // Recommendation se aayega
    role: { 
        type: String, 
        enum: ['user', 'garage', 'admin'], 
        default: 'user' 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);