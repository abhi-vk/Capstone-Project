const mongoose = require("mongoose");

const paymentCardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lastFourDigits: {
      type: String,
      required: true,
      match: /^[0-9]{4}$/, // Ensure only 4 digits are accepted
    },
    expiration: {
      type: String,
      required: true,
      match: /^(0[1-9]|1[0-2])\/[0-9]{2}$/, // MM/YY format
    },
    cvc: {
      type: String,
      required: true,
      match: /^[0-9]{3}$/, // Ensure 3-digit CVC
    },
    nameOnCard: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentCard", paymentCardSchema);
