const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: Number,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  name: String,
  price: Number,
  image: String,
  description: String,

  quantity: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model("Cart", cartSchema);
