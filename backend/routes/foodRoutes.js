const express = require("express");
const router = express.Router();
const FoodCategory = require("../models/FoodCategory");
const FoodItem = require("../models/FoodItem");

// Add a new category
router.post("/categories", async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = new FoodCategory({ categoryName });
        await category.save();
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await FoodCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new food item
router.post("/items", async (req, res) => {
    try {
        const { itemName, category, description, price, imageUrl } = req.body;
        const foodItem = new FoodItem({ itemName, category, description, price, imageUrl });
        await foodItem.save();
        res.status(201).json({ message: "Food item created successfully", foodItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all items by category
router.get("/items/:categoryId", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const items = await FoodItem.find({ category: categoryId }).populate("category");
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
