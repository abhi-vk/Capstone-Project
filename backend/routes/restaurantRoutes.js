const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Add a restaurant
router.post('/add', async (req, res) => {
  const { name, imageUrl } = req.body;
  try {
    const restaurant = new Restaurant({ name, imageUrl });
    await restaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant });
  } catch (err) {
    res.status(500).json({ error: 'Error adding restaurant', details: err });
  }
});

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching restaurants', details: err });
  }
});

module.exports = router;
