const Car = require('../models/Car');

exports.searchCars = async (req, res) => {
    const { query } = req.query; 
    
    if (!query || query.length < 2) return res.json([]); 

    try {
        // Direct model use karein
        const results = await Car.find({
            $or: [
                { Brand: { $regex: query, $options: 'i' } },
                { Model: { $regex: query, $options: 'i' } }
            ]
        }).limit(8);
        
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Search failed" });
    }
};