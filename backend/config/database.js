const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("CarCare Database Connected! 🚀"))
    .catch((err) => {
        console.error("Database Error:", err.message);
        process.exit(1);
    });
};

module.exports = dbConnect;