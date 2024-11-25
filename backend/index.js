const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const foodRoutes = require("./routes/foodRoutes");
const addressRoutes = require("./routes/addressRoutes");
app.use(cors());
env.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/user", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/addresses", addressRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    });
});