const Booking = require('../models/Booking');
const User = require('../models/User');

// 1. Fetch Owner Stats & Bookings
exports.getOwnerStats = async (req, res) => {
    try {
        const { ownerEmail } = req.query;
        const owner = await User.findOne({ email: ownerEmail, role: 'garage_owner' });

        if (!owner) return res.status(404).json({ success: false, message: "Owner not found" });

        const stats = await Booking.aggregate([
            { $match: { garageOwnerEmail: ownerEmail } },
            {
                $group: {
                    _id: null,
                    totalEarnings: {
                        $sum: { $cond: [{ $eq: ["$status", "Completed ✨"] }, "$price", 0] }
                    },
                    totalBookings: { $sum: 1 },
                    liveCars: {
                        $sum: { $cond: [{ $in: ["$status", ["Pending ⏳", "In Progress 🧼", "Confirmed ✅"]] }, 1, 0] }
                    }
                }
            }
        ]);

        const myBookings = await Booking.find({ garageOwnerEmail: ownerEmail }).sort({ createdAt: -1 });

        res.status(200).json({
            stats: stats[0] || { totalEarnings: 0, totalBookings: 0, liveCars: 0 },
            myBookings,
            userServices: owner.services,
            garageDetails: { name: owner.garageName, location: owner.locationArea }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 2. Add Service
exports.addService = async (req, res) => {
    try {
        const { email, serviceName, price } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email, role: 'garage_owner' },
            { $push: { services: { serviceName, price } } },
            { new: true }
        );
        res.status(200).json({ success: true, services: updatedUser.services });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 3. Remove Service
exports.removeService = async (req, res) => {
    try {
        const { email, serviceId } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { email, role: 'garage_owner' },
            { $pull: { services: { _id: serviceId } } },
            { new: true }
        );
        res.status(200).json({ success: true, services: updatedUser.services });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 4. Update Garage Details
exports.updateGarage = async (req, res) => {
    try {
        const { email, garageName, locationArea } = req.body;
        const updated = await User.findOneAndUpdate(
            { email, role: 'garage_owner' },
            { garageName, locationArea },
            { new: true }
        );
        res.status(200).json({ success: true, updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};