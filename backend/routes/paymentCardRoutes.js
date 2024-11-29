const express = require("express");
const router = express.Router();
const PaymentCard = require("../models/PaymentCard");
const { isLoggedIn } = require("../middelware/auth"); // Ensure proper path to middleware

// Add a new card
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { lastFourDigits, expiration, cvc, nameOnCard } = req.body;

    // Check if a card with the same last four digits exists for the user
    const existingCard = await PaymentCard.findOne({
      userId: req.user._id,
      lastFourDigits,
    });

    if (existingCard) {
      return res.status(400).json({ message: "Card with these digits already exists" });
    }

    const card = new PaymentCard({
      userId: req.user._id,
      lastFourDigits,
      expiration,
      cvc,
      nameOnCard,
    });

    await card.save();
    res.status(201).json({ message: "Card added successfully", card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch all cards for the user
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const cards = await PaymentCard.find({ userId: req.user._id });

    if (cards.length === 0) {
      return res.status(404).json({ message: "No payment cards found" });
    }

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Edit card details
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { expiration, cvc, nameOnCard } = req.body;

    const updatedCard = await PaymentCard.findByIdAndUpdate(
      id,
      { expiration, cvc, nameOnCard },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card updated successfully", updatedCard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a card
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;

    const card = await PaymentCard.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
