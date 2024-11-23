const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FoodCategory", foodCategorySchema);
