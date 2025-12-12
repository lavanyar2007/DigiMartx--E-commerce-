const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, 
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
