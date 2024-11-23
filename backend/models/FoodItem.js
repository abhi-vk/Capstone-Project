const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodCategory", // Reference to the FoodCategory model
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
