const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/profile', async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;