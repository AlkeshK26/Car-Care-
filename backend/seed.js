const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Car Schema define karein
const carSchema = new mongoose.Schema({
    Brand: String,
    Model: String,
    Year: Number
});
const Car = mongoose.model('Car', carSchema);

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Local MongoDB...");

        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'cars.json'), 'utf-8'));
        
        await Car.deleteMany(); // Purana data saaf karein
        await Car.insertMany(data);
        
        console.log(`${data.length} Cars successfully added to Database!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();