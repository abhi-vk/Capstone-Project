const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route files
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes = require("./routes/foodRoutes");
const addressRoutes = require("./routes/addressRoutes");
const paymentCardRoutes = require("./routes/paymentCardRoutes"); // New route added

// Middleware setup
app.use(cors());
env.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Route configurations
app.use("/api/user", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cards", paymentCardRoutes); // Add new route for payment cards

// Server start and database connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Database connection failed:", err);
    });
});
