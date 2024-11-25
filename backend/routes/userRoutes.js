const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

// Sign Up Route
router.post("/signup", async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        // Check if user already exists
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "Email already taken" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user
        const newUser = await new User({ email, password: hashedPassword, name, phone }).save();

        // Generate JWT token
        const token = jwt.sign(
            { _id: newUser._id, email, name: newUser.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "User created successfully",
            token,
            id: newUser._id,
            name: newUser.name,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Sign In Route
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare password with hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id, email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful",
            token,
            id: user._id,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
