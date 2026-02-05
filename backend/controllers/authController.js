const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail'); // Email utility import ki gayi hai

// --- SIGNUP CONTROLLER UPDATED ---
exports.signup = async (req, res) => {
    try {
        // Destructuring mein 'garageName' bhi add kiya gaya hai owner ke liye
        const { firstName, lastName, age, email, password, mobile, locationArea, carBrand, carModel, role, adminSecret, garageName } = req.body;

        // --- ADMIN RESTRICTION CONDITION (UNTOUCHED) ---
        console.log("Bheja gaya Secret:", adminSecret);
        console.log("System ka Secret:", process.env.ADMIN_SECRET_KEY);

        if (role === "admin") {
            const existingAdmin = await User.findOne({ role: "admin" });
            if (existingAdmin) {
                return res.status(403).json({
                    success: false,
                    message: "Admin already exists. Only one admin allowed!"
                });
            }

            if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Admin Secret Key!"
                });
            }
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        // --- NEW LOGIC: Role determination without breaking Admin ---
        let finalRole = "user";
        if (role === "admin" && adminSecret === process.env.ADMIN_SECRET_KEY) {
            finalRole = "admin";
        } else if (role === "garage_owner") {
            finalRole = "garage_owner"; // Owner role support add kiya
        }

        const newUser = new User({
            firstName,
            lastName,
            age,
            email,
            password: hashedPassword,
            mobile,
            locationArea,
            carBrand: finalRole === "garage_owner" ? "N/A" : carBrand,
            carModel: finalRole === "garage_owner" ? "Garage Owner" : carModel,
            role: finalRole, // Strict Check logic preserved
            garageName: finalRole === "garage_owner" ? garageName : "", // Owner specific field
            status: finalRole === "user" ? "Washing In Progress 🧼" : "Active ✅"
        });

        await newUser.save();

        // Professional Signup Email Template (Role based message)
        const signupHtml = `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Welcome to CarCare, ${firstName}! 🚗</h2>
                <p>We are thrilled to have you with us. Your account has been successfully created.</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                    <p><strong>Account Type:</strong> ${finalRole.toUpperCase()}</p>
                    ${finalRole === "garage_owner" ? `<p><strong>Garage Name:</strong> ${garageName}</p>` : `<p><strong>Registered Car:</strong> ${carBrand} ${carModel}</p>`}
                </div>
                <p>${finalRole === "garage_owner" ? "Manage your bookings and grow your business with us." : "Now you can book doorstep car washes and manage your garage appointments easily."}</p>
                <br>
                <p>Best Regards,<br><strong>The CarCare Team</strong></p>
            </div>
        `;

        await sendEmail(email, "Welcome to CarCare - Registration Successful", signupHtml);

        res.status(201).json({ success: true, message: "Registration Successful!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
// --- LOGIN CONTROLLER ---
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {

            // Professional Login Security Template
            const loginHtml = `
                <div style="font-family: Arial, sans-serif; border-left: 5px solid #3498db; padding: 20px; background-color: #f4f7f6;">
                    <h3 style="color: #2980b9;">Security Notification: New Login Detected</h3>
                    <p>Hello ${user.firstName},</p>
                    <p>This is a quick alert to let you know that your <strong>CarCare</strong> account was just accessed.</p>
                    <hr>
                    <p>Drive safe!<br><strong>CarCare Security Team</strong></p>
                </div>
            `;

            // Login notification bhejna
            await sendEmail(email, "Security Alert: Successful Login to CarCare", loginHtml);
console.log("User found in DB:", user);
            res.status(200).json({
                success: true,
                email: user.email,
                role: user.role,
                firstName: user.firstName
            });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};