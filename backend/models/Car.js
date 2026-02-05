const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    Brand: { 
        type: String, 
        required: true 
    },
    Model: { 
        type: String, 
        required: true 
    },
    Year: { 
        type: Number 
    }
}, { timestamps: true });

// Model ko export karein
module.exports = mongoose.model('Car', carSchema);