const express = require("express");
const router = express.Router();
const Address = require("../models/Address");
const { isLoggedIn } = require("../middelware/auth");  // Ensure correct path for middleware

// Add a new address
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { name, addressLine, city, state, postalCode, phone, isDefault } = req.body;

   

    // If setting as default, unset other default addresses
    if (isDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const address = new Address({
      userId: req.user._id,  // Ensure the userId is coming from the authenticated user
      name,
      addressLine,
      city,
      state,
      postalCode,
      phone,
      isDefault
    });

    await address.save();
    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch all addresses
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id });

    if (addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found for this user" });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Edit an address
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, addressLine, city, state, postalCode, phone, isDefault } = req.body;

    // If setting as default, unset other default addresses
    if (isDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { name, addressLine, city, state, postalCode, phone, isDefault },
      { new: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address updated successfully", updatedAddress });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete an address
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
