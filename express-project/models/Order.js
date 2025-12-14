const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        id: { type: Number, required: true },   // productId
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true },
        image: { type: String }                  // ✅ REQUIRED FIX
      }
    ],

    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
