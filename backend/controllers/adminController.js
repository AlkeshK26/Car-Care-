const Booking = require('../models/Booking');
const User = require('../models/User'); // Total users count karne ke liye zaroori hai

exports.getAdminStats = async (req, res) => {
    try {
        // 1. Location-wise Stats: Total Cars, Active Bookings, and Earnings
        const locationStats = await Booking.aggregate([
            {
                $group: {
                    _id: "$location",
                    totalBookings: { $sum: 1 },
                    // Sirf 'Completed ✨' bookings ka price revenue mein count hoga
                    totalEarnings: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Completed ✨"] }, "$price", 0]
                        }
                    },
                    activeOnes: {
                        $sum: {
                            $cond: [{ $in: ["$status", ["Pending", "In Progress 🧼"]] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        // 2. Overall Business Total
        const totalBusinessRevenue = locationStats.reduce((acc, curr) => acc + curr.totalEarnings, 0);
        
        const activeBookingsCount = await Booking.countDocuments({ 
            status: { $in: ["Pending", "Confirmed ✅", "In Progress 🧼"] } 
        });

        // --- NEW: Total Users Count Logic ---
        // Isse aapko pata chalega kitne customers registered hain
        const totalUsers = await User.countDocuments({ role: "user" }); 

        // 3. Full List for Table
        const allBookings = await Booking.find().sort({ createdAt: -1 });

        // Response mein totalUsers add kar diya gaya hai
        res.status(200).json({
            totalBusinessRevenue,
            activeBookingsCount,
            totalUsers, // <--- Frontend naye card ke liye
            locationStats,
            allBookings
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Status update karne ka logic
        const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        
        res.status(200).json({ success: true, updated });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};