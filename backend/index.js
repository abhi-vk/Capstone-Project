const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
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